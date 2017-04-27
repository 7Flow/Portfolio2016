/**
 * Controllable character
 * @param game
 * @param x
 * @param y
 * @param data
 * @constructor
 * @extends Phaser.Sprite
 */
Player = function( game, x, y, data )
{
    Phaser.Sprite.call( this, game, x, y, 'atlas', 'level1-stand1.png' );
    this.smoothed = false;

    this.anchor.set( 0.5, 1 );
    game.physics.arcade.enable( this );
    // look right by default
    this.dir = 1;
    this.data = data;

    this.level = 1;
    this.animNameSuffix = this.level;

    // adjust hit box
    this.body.setSize(36, 74, 2, 0);

    this.body.bounce.y = 0;
    this.body.mass = data.mass;
    this.body.collideWorldBounds = true;

    this.playerSteps = game.add.emitter( this.position.x, this.position.y, 5 );
    this.playerSteps.minRotation = 0;
    this.playerSteps.maxRotation = 0;
    // emitter gravity will not override global gravity, but it will be added
    this.playerSteps.gravity = 0;
    this.playerSteps.on = false;
    this.playerSteps.start(true, 200, 0, 5);

    // all level's animations
    var _s = '.png';
    for (var i=1; i<4; ++i) {
        var _p = 'level'+i+'-';
        this.createAnimSet( i, _p, _s );
    }

    game.add.existing( this );
};

Player.prototype = Object.create( Phaser.Sprite.prototype );
Player.prototype.constructor = Player;

// is the player jumping (use to initialize jumpStart)
Player.prototype.jumping = false;
// indicates if we are still able to jump (use to jump higher if we hold jump button)
Player.prototype.jumpingEnabled = true;
// duration jumping is enabled from starting to jump
Player.prototype.jumpingDuration = 0.25;
Player.prototype.jumpStart = 0;

Player.prototype.data = null;

Player.prototype.level = 1;

Player.prototype.playerSteps = null;
Player.prototype.ground = null;
Player.prototype.movingThreshold = 80;

Player.prototype.equipment = null;
Player.prototype.bullets = null;
Player.prototype.nextAttack = 0;

Player.prototype.life = 3;
Player.prototype.invincible = false;

Player.prototype.times = 0;
Player.prototype.highlight = 0xffffff;
Player.prototype.duration = 0;

/**
 * Default ground material
 * @type {{friction: number}} Range(0,1) 1 for no friction at all
 */
Player.prototype.groundDefault = {
    friction: 0
};

Player.prototype.update = function()
{
    // steps particles
    if (this.body.velocity.x != 0 && this.body.touching.down) {
        this.playerSteps.x = this.position.x;
        this.playerSteps.y = this.position.y;
        if (!this.playerSteps.on) this.playerSteps.on = true;

        if (this.body.velocity.x < this.movingThreshold && this.body.velocity.x > -this.movingThreshold) {
            this.body.velocity.x = 0;
            this.position.x = Math.round( this.position.x );
        }
    } else {
        this.playerSteps.on = false;
        if (!this.body.touching.down) {
            this.animations.play( 'jump'+this.animNameSuffix );
            this.platform = null;
        }
    }

    if (this.platform) {
        this.platform.moveWith( this );
    }
};

Player.prototype.moveLeft = function( deltaTime )
{
    this.dir = -1;
    this.body.velocity.x -= this.data.accel * deltaTime;
    if (this.body.velocity.x < this.data.maxSpeed) this.body.velocity.x = -this.data.maxSpeed;
    // update sprite
    this.scale.x = this.dir;
    if (this.body.touching.down) {
        this.animations.play( 'walk'+this.animNameSuffix );

        this.playerSteps.minParticleSpeed.setTo(10, -40);
        this.playerSteps.maxParticleSpeed.setTo(80, -100);
    }
};

Player.prototype.moveRight = function( deltaTime )
{
    this.dir = 1;
    this.body.velocity.x += this.data.accel * deltaTime;
    if (this.body.velocity.x > this.data.maxSpeed) this.body.velocity.x = this.data.maxSpeed;
    // update sprite
    this.scale.x = this.dir;
    if (this.body.touching.down) {
        this.animations.play( 'walk'+this.animNameSuffix );
        this.playerSteps.minParticleSpeed.setTo(-10, -40);
        this.playerSteps.maxParticleSpeed.setTo(-80, -100);
    }
};

Player.prototype.jump = function( deltaTime )
{
    if (this.body.touching.down || this.jumpingEnabled) {
        if (!this.jumping) {
            this.jumping = this.jumpingEnabled = true;
            this.jumpStart = 0;
            this.animations.play( 'jump'+this.animNameSuffix );
        }

        this.body.velocity.y = -this.data.jumpAccel * deltaTime;
        if (this.body.velocity.y < this.data.jumpMax) this.body.velocity.y = this.data.jumpMax;
        this.jumpStart += deltaTime;

        if (this.jumpStart > this.jumpingDuration) {
            this.jumpingEnabled = false;
        }

        this.platform = null;
    } else {
        this.stopJump();
    }
};
Player.prototype.stopJump = function()
{
    this.jumping = this.jumpingEnabled = false;
};

Player.prototype.stand = function()
{
    if (!this.body.touching.down) {
        this.body.velocity.x *= 0.8;
    } else if (!this.jumping) {
        this.animations.play( 'stand'+this.animNameSuffix );
        // slight slow down
        if (this.body.velocity.x != 0) this.body.velocity.x *= this.ground.friction;
    }
};

/**
 *
 * @param player
 * @param ground
 */
Player.prototype.onGround = function( player, ground )
{
    if (ground.data && ground.data.material) {
        var _mat = this.game.state.getCurrentState().data.materials[ ground.data.material ];
        if (this.ground != _mat) {
            this.ground = _mat;
            this.playerSteps.removeAll(true);
            if (this.ground.atlas) this.playerSteps.makeParticles( "atlas", this.ground.particle );
            else this.playerSteps.makeParticles( this.ground.particle );
        }
    } else {
        this.ground = this.groundDefault;
        this.playerSteps.removeAll(true);
    }
};

/**
 *
 * @param player
 * @param platform
 */
Player.prototype.onPlatform = function( player, platform )
{
    this.platform = platform;
    this.onGround( player, platform );
};

Player.prototype.onCollect = function( player, collectable )
{
    switch( collectable.data.type )
    {
        case "buff":
            this.flicker( 0xffff66, 4, 0.2 );
            for (var param in collectable.  data) {
                if (this.data[param]) {
                    this.data[param] += collectable.data[param];
                }
            }
            ++this.level;
            this.animNameSuffix = this.level;
            if (this.equipment) {
                this.animNameSuffix += '-' + this.equipment.id;
                this.createAnimSet( this.animNameSuffix, 'level'+this.level+'-', '-'+this.equipment.id );
            }
            break;
        case "weapon":
            this.equip( collectable.data );
            break;
    }
    collectable.kill();
};

Player.prototype.flicker = function( color, times, duration )
{
    this.duration = Phaser.Timer.SECOND * duration;
    this.highlight = color;

    this.times = 0;
    this.num = times;

    this.flickering();
};
Player.prototype.flickering = function()
{
    if (this.tint == this.highlight) this.tint = 0xffffff;
    else this.tint = this.highlight;

    ++this.times;
    if (this.times >= this.num) {
        this.tint = 0xffffff;
        this.invincible = false;
    } else {
        this.game.time.events.add( this.duration, this.flickering, this);
    }
};

/**
 * Add a weapon to the Player
 * @param {object} data Object containing: weapon sprite id, bullet data (initial velocity, offset -from anchor-, sprite id)
 */
Player.prototype.equip = function( data )
{
    this.equipment = data;
    // create a bullet pool
    if (!this.game.groups.hasOwnProperty('playerAmmos')) {
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.groups.playerAmmos = this.bullets;
    }
    else if (!this.bullets) this.bullets = this.game.groups.playerAmmos;

    this.bullets.removeChildren(0);

    this.bullets.createMultiple(20, 'atlas', this.equipment.bullet);
    this.bullets.setAll('anchor.x', 0);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('body.mass', this.equipment.mass);
    this.bullets.setAll('lifespan', 3000);

    this.equipment.current = this.equipment.capacity;
    this.equipment.ammos -= this.equipment.capacity;

    this.game.gui.equip( this.equipment );

    this.animNameSuffix = this.level + '-' + data.id;
    this.createAnimSet( this.animNameSuffix, 'level'+this.level+'-', '-'+data.id );

    this.anchor.x = 0.33;
};

/**
 * If player is equiped w/ a weapon,
 * Depend of the weapon's rate of fire
 * And the weapon's clip
 */
Player.prototype.attack = function()
{
    if (this.equipment && this.game.time.now > this.nextAttack && this.equipment.current > 0) {
        // recycle oldest bullet from the pool
        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset( this.position.x + this.equipment.offset.x * this.dir, this.position.y - this.equipment.offset.y );
            bullet.scale.x = this.dir;
            bullet.body.velocity.x = this.equipment.velocity * this.dir;
            bullet.lifespan = 3000;
            // limit rate of fire
            this.nextAttack = this.game.time.now + 300;

            --this.equipment.current;

            this.game.gui.action( this.equipment.current );
        }
    }
};
Player.prototype.reload = function()
{
    if (this.equipment.ammos > 0) {
        var _toReload = this.equipment.capacity - this.equipment.current;
        _toReload = Math.min( _toReload, this.equipment.ammos );

        var _current = this.equipment.current;
        this.equipment.current += _toReload;
        this.equipment.ammos -= _toReload;
        this.nextAttack = this.game.time.now + 400 + (100 * _toReload);

        this.game.gui.reload(_current, this.equipment.current, this.equipment.ammos );
    }
};
Player.prototype.refill = function( num )
{
    this.equipment.ammos += num;
};

/**
 * When Player is hit by ammo
 * All ammo remove 1 heart (for now...)
 * - become invincible for 1sec
 * - fx: flick for 1sec
 * @param player
 * @param ammo [optionnal]
 */
Player.prototype.onHit = function( player, ammo )
{
    if (!this.invincible) {
        --this.life;
        this.invincible = true;
        this.flicker( 0xff0000, 5, 0.15 );

        if (this.life <= 0) {
            this.game.state.getCurrentState().freeze();
            var _this = this;
            setTimeout( function() {
                //this.game.state.start("Menu");
                _this.game.state.restart();
            }, 500);
        }

        if (ammo) ammo.kill();

        this.game.gui.lostLife( this.life );
        this.game.camera.shake( 0.002, 100, true, Phaser.Camera.SHAKE_HORIZONTAL );
    }
};

/**
 * Create a complete set of animation (for all player's moves) for a specific 'state' (level and/or equipment)
 * @param {string} name Suffix animation name.
 * @param {string} prefix Start of the sprite name.
 * @param {string} suffix End of the sprite name, usually equals to '.png'.
 */
Player.prototype.createAnimSet = function( name, prefix, suffix )
{
    this.animations.add('stand'+name,  Phaser.Animation.generateFrameNames(prefix+'stand', 1, 2, suffix), 2, true);
    this.animations.add('walk'+name,   [prefix+'walk1'+suffix, prefix+'walk2'+suffix, prefix+'walk3'+suffix, prefix+'walk2'+suffix], 6, true);
    //this.animations.add('attack'+name, Phaser.Animation.generateFrameNames(prefix+'-attack', 1, 3, suffix), 5, false);
    //this.animations.add('hit'+name,    Phaser.Animation.generateFrameNames(prefix+'-hit', 1, 1, suffix), 1, false);
    this.animations.add('jump'+name, [prefix+'jump'+suffix], 1, false);
};