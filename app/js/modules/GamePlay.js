
import GUI from '../modules/GUI.js';

var playGame = function(game) {
    this.game = game;
};

playGame.prototype = {

    game: null,
    timer: null,
    groups: {},

    ammosGroups: [],
    ammosGroupsLength: 0,
    bulletsGroups: [],
    bulletsGroupsLength: 0,

    data: {},

    camera: null,

    isFreezed: false,

    // Phaser.Game.State interface
    preload: function()
    {
        var _tex;
        for (var id in this.data.textures.play) {
            _tex = this.data.textures.play[id];

            switch( _tex.type ) {
                case "atlas":
                    this.game.load.atlas(id, _tex.path, _tex.json, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
                    break;
                case "spritesheet":
                    this.game.load.spritesheet( id, _tex.path, _tex.width, _tex.height );
                    break;
                default:
                    this.game.load.image( id, _tex.path );
                    break;
            }
        }
    },

    // Phaser.Game.State interface
    create: function()
    {
        this.groups = {};
        this.isFreezed = false;

        Math.toRad = Math.PI / 180;
        Math.toDeg = 180 / Math.PI;

        var _w = this.game.stage.width;
        var _h = this.game.stage.height;

        // make data accessible
        this.game.data = this.data;

        this.game.stage.backgroundColor = '#e0e4f1';
        this.backdrop = new Backdrop( this.game );
        this.backdrop.setBackground([
            {point: 0, color: "#6699cc"},
            {point: 0.6, color: "#99ccff"},
            {point: 0.8, color: "#ccffff"},
            {point: 1, color: "#ffffcc"}
        ]);
        this.groups.backdrop = this.backdrop;

        // 8bit pixel style
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp( this.game.canvas );

        // Custom Camera
        this.camera = new SideCamera( this.game, 1, 0,0, _w, _h );
        this.camera.bounds.height = this.data.world.height * this.data.tileSize;
        this.camera.bounds.width = this.data.world.width * this.data.tileSize;
        this.camera.lookBounds.offsetX = -_w * 0.5;
        this.camera.boot();

        this.game.world.setBounds(0, 0, this.world.width * this.data.tileSize, this.data.world.height * this.data.tileSize);

        // only AABB collisions (no need to be very accurate w/ player, and world is square tiled)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.data.gravity;

        this.game.groups = this.groups;
        this.game.findInGroup = this.findInGroup;

        this.backdrop.cameraOffset.y = -(this.data.world.height * this.data.tileSize - this.game.height);

        var i, j, _gL, _data;

        // create map element
        // - position (x,y), from bottom-left origin
        // - repeat (num of times repeated on x-axis)
        // - texture: id & tile width
        _gL = this.data.backdrops.length;
        for (i=0; i<_gL; ++i) {
            _data = this.data.backdrops[i];
            var _l = _data.repeat ? _data.repeat / _data.texture.width : 1;
            var _pos = _data.x;
            // assume a top-left anchor (custom type have to deal with that)
            // and tilemap is 0-based
            var _group = this.getGroup( _data.group, false );
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;
            for (j=0; j<_l; ++j) {
                var _tile = this.createSprite( _data, _group, _pos * this.data.tileSize, _y );
                _pos += _data.texture.width;
            }
        }

        // statics element: immovable, but active body, so player can move on
        _gL = this.data.statics.length;
        for (i=0; i<_gL; ++i) {
            _data = this.data.statics[i];

            var _l = _data.repeat / _data.texture.width;
            var _pos = _data.x;
            // assume a top-left anchor (custom type have to deal with that)
            // and tilemap is 0-based
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;

            var _group = this.getGroup( _data.group, true );

            for (j=0; j<_l; ++j) {
                var _tile = this.createSprite( _data, _group, _pos * this.data.tileSize, _y );
                if (_data.data && _data.data.type == "platform") {
                    _tile.body.checkCollision.left = _tile.body.checkCollision.down = _tile.body.checkCollision.right = false;
                }
                _pos += _data.texture.width;
            }
        }

        // dynamics element: active body
        _gL = this.data.dynamics.length;
        for (i=0; i<_gL; ++i) {
            _data = this.data.dynamics[i];

            var _l = _data.repeat / _data.texture.width;
            var _pos = _data.x;
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;

            var _group = this.getGroup( _data.group, true );

            for (var j=0; j<_l; ++j) {
                var _tile = this.createSprite( _data, _group, _pos * this.data.tileSize, _y );
                _pos += _data.texture.width;
            }
        }

        // adding the hero
        this.player = new Player( this.game, 2 * this.data.tileSize, (this.data.world.height - 1) * this.data.tileSize, this.data.player );
        this.game.player = this.player;
        // don't use target property
        this.camera.lookTarget.object = this.player;

        //this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors = this.game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP,
            'down': Phaser.KeyCode.DOWN,
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'action': Phaser.KeyCode.SPACEBAR,
            'reload': Phaser.KeyCode.CONTROL,
            'pause': Phaser.KeyCode.P
        });

        // gui
        this.getGroup('gui', false);
        this.game.gui = new GUI( this.game );

        this.cursors.pause.onUp.add( this.game.gui.togglePause, this.game.gui );

        $('#about').trigger('state:created');
    },

    getGroup: function( groupName, physics )
    {
        if (!this.groups[groupName]) {
            var _group = this.game.add.group();
            if (physics) _group.enableBody = true;
            this.groups[groupName] = _group;
            return _group;
        } else {
            return this.groups[groupName];
        }
    },

    getAmmoGroup: function( name, type )
    {
        var _group = this.game.add.group();
        _group.enableBody = true;
        _group.physicsBodyType = Phaser.Physics.ARCADE;

        if (type == 'bullet') {
            this.bulletsGroups.push( _group );
            ++this.bulletsGroupsLength;
        } else {
            this.ammosGroups.push( _group );
            ++this.ammosGroupsLength;
        }
        return _group;
    },

    createSprite: function( data, group, x, y )
    {
        var _tile;

        if (data.ctor) {
            _tile = new window[data.ctor]( this.game, x, y, data );
            group.add( _tile );
        } else {
            if (data.texture.atlas) {
                _tile = group.create(x, y, data.texture.atlas, data.texture.id);
            } else {
                _tile = group.create(x, y, data.texture.id);
            }

            if (_tile.body) {
                _tile.body.immovable = true;
                _tile.body.allowGravity = false;
            }
        }

        _tile.smoothed = false;

        if (data.name) _tile.name = data.name;
        if (data.data) {
            _tile.data = Object.assign({}, data.data);
            if (data.data.type == "destructible") {
                _tile.data.life = this.data.materials[ data.data.material ].life;
            }
        }
        return _tile;
    },

    findInGroup: function( groupName, name )
    {
        var _first, _current;
        var _group = this.groups[ groupName ];
        _first = _group.cursor;
        if (_first.name == name) return _first;
        // next iterator will loop through children
        // and loop to first when reaching end
        _current = _group.next();
        while (_current != _first) {
            if (_current.name == name) return _current;
            _current = _group.next();
        }
        return null;
    },

    // Phaser.Game.State interface
    update: function()
    {
        if (this.isFreezed) return;

        // grounds & platforms (one-way collisions)
        this.game.physics.arcade.collide( this.player, this.groups.grounds, this.player.onGround, null, this.player );
        this.game.physics.arcade.collide( this.player, this.groups.movingPlatforms, this.player.onPlatform, null, this.player);
        this.game.physics.arcade.collide( this.groups.collectable, this.groups.grounds, null, null, this);
        this.game.physics.arcade.collide( this.groups.enemies, this.groups.grounds, null, null, this);

        // breakable/hittable blocks
        this.game.physics.arcade.collide( this.player, this.groups.hittable, this.onHit, null, this );
        this.game.physics.arcade.collide( this.groups.collectable, this.groups.hittable, null, null, this);
        // bonus - powerup: collectables
        this.game.physics.arcade.overlap( this.player, this.groups.collectable, this.onCollect, null, this);

        this.game.physics.arcade.collide( this.player, this.groups.deaths, this.onDeath, null, this);

        // enemy ammos
        var _group;
        for (var i=0; i<this.ammosGroupsLength; ++i) {
            _group = this.ammosGroups[i];
            this.game.physics.arcade.collide( this.player, _group, this.player.onHit, null, this.player);
            this.game.physics.arcade.collide( _group, this.groups.grounds, null, null, this);
            this.game.physics.arcade.collide( _group, this.groups.hittable, null, null, this);
        }
        for (var i=0; i<this.bulletsGroupsLength; ++i) {
            _group = this.bulletsGroups[i];
            this.game.physics.arcade.collide( this.player, _group, this.player.onHit, null, this.player);
            this.game.physics.arcade.collide( _group, this.groups.grounds, this.onDestroy, null, this);
            this.game.physics.arcade.collide( _group, this.groups.hittable, this.onDestroy, null, this);
        }

        // player ammos
        this.game.physics.arcade.collide( this.groups.enemies, this.groups.playerAmmos, this.onHitEnemy, null, this);
        this.game.physics.arcade.collide( this.groups.playerAmmos, this.groups.grounds, this.onDestroy, null, this);
        this.game.physics.arcade.collide( this.groups.playerAmmos, this.groups.hittable, this.onDestroy, null, this);

        var _deltaTime = this.game.time.physicsElapsed;

        if (this.cursors.left.isDown) {
            this.player.moveLeft.call( this.player, _deltaTime );
            this.camera.lookTo( -1 );
        }
        else if (this.cursors.right.isDown) {
            this.player.moveRight.call( this.player, _deltaTime );
            this.camera.lookTo( 1 );
        }
        else {
            this.player.stand.call( this.player );
        }

        if (this.cursors.action.isDown) {
            var _collision = this.game.physics.arcade.overlap( this.player, this.groups.triggerable, this.onTrigger, null, this);
            if (!_collision ) {
                this.player.attack();
            }
        }
        if (this.cursors.reload.isDown) {
            this.player.reload();
        }

        // Jumping: need to be on ground
        // the longer we hold jumping btn, the higher we go
        if (this.cursors.up.isDown) {
            this.player.jump.call( this.player, _deltaTime );
        } else {
            this.player.stopJump.call( this.player );
        }
    },

    onHit: function( player, other )
    {
        if (!player.body.wasTouching.none) return;
        other.hit();
    },

    onTrigger: function( player, trigger )
    {
        if (!trigger.on) {
            trigger.activate();
        } else {
            trigger.deactivate();
        }
    },

    onCollect: function( player, collectable )
    {
        if (collectable.data.onCollect) {
            this.game.gui.showInfos( collectable.data.onCollect, 3.5 );
        }
        this.player.onCollect( player, collectable );
    },

    onHitEnemy: function( enemy, ammo )
    {
        enemy.hit.call( enemy );
        // better not used destroy: avoid getting an error in the physics loop
        ammo.kill();
    },

    onDeath: function( player, death )
    {
        player.life = 1;
        player.onHit();
    },

    onDestroy: function( ammo, ground )
    {
        ammo.kill();
    },


    resize: function()
    {
        var _w = window.Game.canvas.clientWidth;
        var _h = window.Game.canvas.clientHeight;

        this.camera.lookBounds.offsetX = -_w * 0.5;
        this.backdrop.cameraOffset.y = -(this.data.world.height * this.data.tileSize - this.game.height);
        this.backdrop.resize();

        this.groups.movingPlatforms.forEach( function( platform ) {
            if (platform.walkableArea.axis === "y") {
                platform.updateArea();
            }
        }, this );
    },

    /**
     * 'Freeze' the current game state:
     * Pause physics, but not the renderer.
     */
    freeze: function()
    {
        this.physics.arcade.isPaused = true;
        this.isFreezed = true;
    },

    unFreeze: function()
    {
        this.physics.arcade.isPaused = false;
        this.isFreezed = false;
    },

    // Phaser.Game.State interface
    destroy: function()
    {
        this.cache.destroy();
        //this.game.cache = new Phaser.Cache( this.game );
        this.game.load.reset();
        this.game.load.removeAll();

        this.game.gui.destroy();
        delete this.game.gui;

        this.backdrop = null;
        this.cursors = null;
        this.player = null;
        this.game = null;

        this.ammosGroups = [];
        this.ammosGroupsLength = 0;
        this.bulletsGroups = [];
        this.bulletsGroupsLength = 0;

        this.groups = {};
        this.data = {};
    }
};

export default playGame;
