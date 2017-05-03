/**
 * Platform walker
 * @param game
 * @param x
 * @param y
 * @param texture
 * @param data
 * @constructor
 * @extends Walker
 */
Enemy = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.position.x += 10;
    // adjust hit box
    this.body.setSize(34, 82, 4, 2);
    this.body.allowGravity = true;

    this.sqRange = this.range * game.data.tileSize;
    this.sqRange *= this.sqRange;

    this.sqWeaponRange = this.weaponRange * game.data.tileSize;
    this.sqWeaponRange *= this.sqWeaponRange;

    this.equipment = data.data;
    // create a bullet pool for each ammo
    //if (!game.groups.hasOwnProperty(this.equipment.bullet)) {
        this.bullets = this.game.state.getCurrentState().getAmmoGroup( this.equipment.bullet, this.equipment.type );
    //}

    this.bullets.createMultiple(20, 'atlas', this.equipment.bullet);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('body.mass', this.equipment.mass);
    this.bullets.setAll('body.bounce.x', 1);
    this.bullets.setAll('lifespan', 5000);

    if (this.equipment.type) {
        switch(this.equipment.type) {
            case 'grenade':
                this.bullets.setAll('body.bounce.y', 1);
                break;
            case 'bullet':
                this.bullets.setAll('body.bounce.y', 1);
                break;
        }
    }

    // base frame name
    var _baseName = data.texture.id.replace('.png', '');
    // setup animation
    this.animations.add('stand',  [_baseName+'-walk2.png'], 1, false);
    this.animations.add('walk',   [_baseName+'-walk1.png', _baseName+'-walk2.png', _baseName+'-walk3.png', _baseName+'-walk2.png'], 6, true);
    this.animations.add('attack', Phaser.Animation.generateFrameNames(_baseName+'-attack', 1, 3, '.png'), 5, false);
    this.animations.add('hit',    Phaser.Animation.generateFrameNames(_baseName+'-hit', 1, 1, '.png'), 1, false);
    this.animations.add('die',    Phaser.Animation.generateFrameNames(_baseName+'-die', 1, 5, '.png'), 8, false);

    this.patrol();
};

Enemy.prototype = Object.create( Walker.prototype );
Enemy.prototype.constructor = Enemy;

Enemy.prototype.toBeDestroy = false;

Enemy.prototype.life = 3;
Enemy.prototype.range = 6;
Enemy.prototype.weapon = null;
Enemy.prototype.weaponRange = 5;

Enemy.prototype.velocity = 50;
Enemy.prototype.state = "patrol";

Enemy.prototype.nextAttack = 0;

Enemy.prototype.update = function()
{
    // destroy on update
    // instead of physics loop (overlap or collide) to avoid "Uncaught TypeError: Cannot read property 'right' of null"
    if (this.toBeDestroy) {
        this.destroy();
        return;
    }

    if (this.hitted) return;

    switch( this.state )
    {
        case "engage":
            this.engage();
            break;
        case "patrol":
            if (!this.onWalkableArea()) {
                this.wait();
            }
        case "waiting":
            // check player visibility
            var _dx = this.game.player.x - this.position.x;
            var _dy = this.game.player.y - this.position.y;
            // enemy looks to the player?
            if (_dx * this.dir >= 0) {
                var _sqDst = _dx * _dx + _dy * _dy;
                // is the player in range to bo visible?
                if (_sqDst <= this.sqRange) {
                    this.state = "engage";
                } else if (this.state == "engage") {
                    this.state = "patrol";
                }
            }
            break;
    }
};

Enemy.prototype.patrol = function()
{
    this.animations.play('walk');
    this.state = "patrol";
    this.dir *= -1;
    this.scale.x = this.dir;
    this.body.velocity.x = this.velocity * this.dir;
};

Enemy.prototype.wait = function()
{
    this.animations.play('stand');
    if (this.dir == 1) this.position.x = Math.floor( this.position.x );
    else this.position.x = Math.ceil( this.position.x );

    this.state = "waiting";
    this.body.velocity.x = 0;

    this.game.time.events.add( Phaser.Timer.SECOND * 4, this.stopWaiting, this);
};

Enemy.prototype.stopWaiting = function()
{
    if (this.state != "engage" && this.state != "dead") {
        this.patrol();
    }
};

Enemy.prototype.engage = function()
{
    var _dx = this.game.player.x - this.position.x;
    var _dy = this.game.player.y - this.position.y;

    var _sqDst = _dx * _dx + _dy * _dy;
    // is the player in range to bo visible?
    if (_sqDst > this.sqRange) {
        console.log('->to wait');
        // player became invisible. wait for a second before return to patrol (not so dumb IA)
        this.wait();
        return;
    }

    // do i need to walk to attack?
    if (this.onWalkableArea()) {
        if (Math.abs(_dx) > this.game.data.tileSize) {
            this.dir = _dx > 0 ? 1 : -1;
            this.scale.x = this.dir;
            this.body.velocity.x = this.velocity * this.dir;
        } else {
            this.body.velocity.x = 0;
        }
    }

    if (_dx * this.dir < 0) {
        // do i need to flip?
        this.dir = -this.dir;
        this.scale.x = this.dir;
        this.body.velocity.x = this.body.velocity.x * this.dir;
    }

    // in range to attack?
    if (this.weaponRange > 0) {
        var _dy = this.game.player.y - this.position.y;
        var _sqDst = _dx * _dx + _dy * _dy;
        if (_sqDst <= this.sqWeaponRange) {
            this.attack();
        }
    } else {
        this.attack();
    }
};

Enemy.prototype.attack = function()
{
    if (this.game.time.now > this.nextAttack) {
        this.animations.play('attack');
        // recycle oldest bullet from the pool
        var bullet = this.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset( this.position.x + this.equipment.offset.x * this.dir, this.position.y - this.equipment.offset.y );

            var g = 250; // gravity

            if (this.equipment.type != 'bullet') {
                // PARABOLA BALLISTIC
                // calculate the angle of reach
                var v = this.equipment.velocity;
                var v2 = v * v;
                var v4 = v2 * v2;

                // adjust target position with ist velocity
                var x = this.game.player.position.x - this.position.x;
                var y = this.game.player.position.y - this.position.y;
                var gX = g * x;

                var a = (v2 / gX) + Math.sqrt((v2 / gX) * (v2 / gX) - 1);
                if (isNaN(a)) {
                    // too far
                    a = Math.PI * 0.25 + (this.dir - 1) * -Math.PI * 0.25;
                } else {
                    // target is in range
                    // result:      convert to:
                    //     0           90
                    // -90 | +90    180 | 0
                    // ---------    --------
                    a = Math.PI * 0.5 - Math.atan(a);
                }
                bullet.body.velocity.x = Math.cos(a) * this.equipment.velocity;
                bullet.body.velocity.y = Math.sin(a) * -this.equipment.velocity;
            } else {
                bullet.body.velocity.x = this.equipment.velocity * this.dir;
                bullet.body.velocity.y = 0;
            }
            bullet.lifespan = 5000;

            // limit rate of fire
            this.nextAttack = this.game.time.now + ( 1000 / this.equipment.rof );
        }
    }
};

/**
 * Hit by player ammo. Basicaly lost a life (no real health points).
 * Start hit animation.
 */
Enemy.prototype.hit = function()
{
    --this.life;
    if (this.life==0) this.die();
    else {
        this.hitted = true;
        this.nextAttack += 350;

        this.animations.play('hit');
        this.body.velocity.y -= 100;
        this.game.time.events.add( 300, this.afterHit, this);
    }
};

/**
 * Stop hit animation, & return to normal state.
 */
Enemy.prototype.afterHit = function() {
    this.hitted = false;
    this.animations.play('stand');
    this.body.velocity.x = 0;
};

/**
 * Died: deactivate body, and play die animation.
 */
Enemy.prototype.die = function()
{
    this.state = "dead";
    this.body.enable = false;
    this.hitted = true;

    this.animations.play('die');
    this.game.time.events.add( 1000, this.dead, this);
};
/**
 * Kill object (wait for next frame to destoy it)
 */
Enemy.prototype.dead = function()
{
    this.toBeDestroy = true;
    this.kill();
};