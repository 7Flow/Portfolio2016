
var menuGame = function(game) {
    this.game = game;
};

menuGame.prototype = {

    game: null,

    buttons: [],
    current: 0,
    length: 0,

    currentMenu: null,

    returnBtn: null,

    // Phaser.Game.State interface
    preload: function()
    {
        var _tex;
        for (var id in this.data.textures.menu) {
            _tex = this.data.textures.menu[id];

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
        this.game.stage.backgroundColor = '#36688B';
        // 8bit pixel style
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.cursors = this.game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP,
            'down': Phaser.KeyCode.DOWN,
            'enter': Phaser.KeyCode.ENTER
        });

        this.cursors.enter.onUp.add( this.select, this );
        this.cursors.up.onUp.add( this.previous, this );
        this.cursors.down.onUp.add( this.next, this );

        // GROUND (like Sonic)
        this.grounds = this.game.add.group();

        var _image = new Phaser.Image( this.game, 0,0, "menu", "grass.png" );
        this.ground = new Phaser.TileSprite( this.game, 0, this.game.height+128, this.game.width, _image.height, _image.texture );
        this.grounds.add( this.ground );

        this.game.add.tween( this.ground ).to( {y: this.game.height-64}, 2000, Phaser.Easing.Cubic.out, true, 0 );

        // LOGO
        this.logo = this.game.add.group();
        this.bg = new Phaser.Sprite(this.game, 0,-500, "menu", "couch.png");
        this.bg.anchor.set( 0.5, 1 );
        this.floux = new Phaser.Sprite(this.game, 0,-500, "menu", "floux.png");
        this.floux.anchor.set( 0.5, 1 );
        this.logo.add( this.bg );
        this.logo.add( this.floux );

        this.super = new Phaser.Sprite(this.game, -40,-500, "menu", "super.png");
        this.new = new Phaser.Sprite(this.game, -70,-88, "menu", "new.png");
        this.new.anchor.set(0.5, 0.5);
        this.new.scale.setTo(2, 2);
        this.two = new Phaser.Sprite(this.game, 552,-88, "menu", "deux.png");
        this.new.alpha = this.two.alpha = 0;

        this.logo.add( this.two );
        this.logo.add( this.super );
        this.logo.add( this.new );

        this.game.add.tween( this.bg ).to( {y: 0}, 1000, Phaser.Easing.Back.Out, true, 250 );
        this.game.add.tween( this.floux ).to( {y: -10}, 600, Phaser.Easing.Back.Out, true, 850 );

        this.game.add.tween( this.super ).to( {y: -102}, 600, Phaser.Easing.Cubic.In, true, 1850 );

        this.game.add.tween( this.new ).to( {alpha: 1}, 400, Phaser.Easing.Cubic.Out, true, 2700 );
        this.game.add.tween( this.new.scale ).to( {x: 1, y: 1}, 600, Phaser.Easing.Back.Out, true, 2700 );

        this.game.add.tween( this.two ).to( {alpha: 1, x: 48}, 400, Phaser.Easing.Cubic.In, true, 3350 );

        // MAIN MENU
        this.buttons = [];
        this.mainMenu = this.game.add.group();
        var _start = new Button( this.game, -128, 0, 256, 64, "JOUER", 0 );
        this.buttons.push( _start );
        this.mainMenu.add( _start );

        var _controls = new Button( this.game, -128, 60, 256, 64, "CONTROLES", 1 );
        this.buttons.push( _controls );
        this.mainMenu.add( _controls );

        var _help = new Button( this.game, -128, 120, 256, 64, "AIDE", 2 );
        this.buttons.push( _help );
        this.mainMenu.add( _help );

        this.length = this.buttons.length;
        this.buttons[this.current].over();

        this.returnBtn = new Button( this.game, -128, 120, 256, 64, "RETOUR", 3 );

        // CONTROLS MAP
        var _style = {
            font: 'press_start_2pregular',
            fontSize: 12,
            align: 'left',
            stroke: '#000000',
            fill: '#ffffff',
            strokeThickness: 4
        };

        this.ctrlMap = this.game.add.group();
        var _key = new Phaser.Sprite( this.game, -202, 0, "menu", "key-left.png");
        this.ctrlMap.add( _key );
        _key = new Phaser.Sprite( this.game, -165, 0, "menu", "key-up.png");
        this.ctrlMap.add( _key );
        _key = new Phaser.Sprite( this.game, -128, 0, "menu", "key-right.png");
        this.ctrlMap.add( _key );

        _key = new Phaser.Sprite( this.game, -193, 47, "menu", "key-space.png");
        this.ctrlMap.add( _key );

        _key = new Phaser.Sprite( this.game, -136, 94, "menu", "key-ctrl.png");
        this.ctrlMap.add( _key );

        var _txt = new Phaser.Text( this.game, -74, 6, "gauche / sauter / droite", _style);
        this.ctrlMap.add( _txt );
        _txt = new Phaser.Text( this.game, -74, 53, "action & attaquer", _style);
        this.ctrlMap.add( _txt );
        _txt = new Phaser.Text( this.game, -74, 100, "recharger", _style);
        this.ctrlMap.add( _txt );

        this.ctrlMap.visible = false;

        // TUTORIAL
        this.help = this.game.add.group();
        this.help.visible = false;

        this.currentMenu = this.mainMenu;

        // enable mouse only on main menu
        _start.onInputDown.add( this.onDown, this );
        _controls.onInputDown.add( this.onDown, this );
        _help.onInputDown.add( this.onDown, this );
        this.returnBtn.onInputDown.add( this.onDown, this );

        _start.onInputOver.add( this.onOver, this );
        _controls.onInputOver.add( this.onOver, this );
        _help.onInputOver.add( this.onOver, this );
        this.returnBtn.onInputOver.add( this.onOver, this );

        this.returnBtn.input.enabled = false;

        $('#about').trigger('state:created');
    },

    /**
     * Keyboard controls
     */
    next: function()
    {
        if (this.current > -1) this.buttons[this.current].out();
        ++this.current;
        if (this.current > this.length-1) this.current = 0;
        this.buttons[this.current].over();
    },

    previous: function()
    {
        if (this.current > -1) this.buttons[this.current].out();
        --this.current;
        if (this.current < 0) this.current = this.length-1;
        this.buttons[this.current].over();
    },

    // Phaser.Game.State interface
    update: function()
    {
        //  Scroll the ground
        this.ground.tilePosition.x -= 5;
    },

    /**
     * Mouse controls
     */
    onOver: function(e)
    {
        if (this.current > -1) {
            if (this.current !== e.data.id) this.buttons[this.current].out();
            else return;
        }

        if (e.data.id > -1 && e.data.id < this.buttons.length) {
            this.current = e.data.id;
            this.buttons[this.current].over();
        } else {
            this.returnBtn.over();
        }
    },

    onDown: function(e)
    {
        console.log("#onDown: "+e.data.id);
        switch (e.data.id) {
            case 0:
                this.game.state.start("Play");
                break;
            case 1:
                this.showGroup( this.ctrlMap );
                break;
            case 2:
                this.showGroup( this.help );
                break;
            case 3:
                this.returnToMainMenu();
                break;
        }
    },

    select: function()
    {
        if (this.currentMenu == this.mainMenu) {
            switch( this.current ) {
                case 0:
                    this.game.state.start("Play");
                    break;
                case 1:
                    this.showGroup( this.ctrlMap );
                    break;
                case 2:
                    this.showGroup( this.help );
                    break;
            }
        } else {
            this.returnToMainMenu();
        }
    },

    showGroup: function( group )
    {
        this.currentMenu.visible = false;

        this.currentMenu = group;
        this.currentMenu.add( this.returnBtn );
        this.currentMenu.visible = true;

        this.returnBtn.over();

        this.buttons[0].input.enabled = this.buttons[1].input.enabled = this.buttons[2].input.enabled = false;
        this.returnBtn.input.enabled = true;
    },

    returnToMainMenu: function()
    {
        this.returnBtn.out();
        if (this.current > -1) this.buttons[this.current].out();

        this.currentMenu.visible = false;
        this.currentMenu = this.mainMenu;
        this.currentMenu.visible = true;

        this.current = 0;
        this.buttons[this.current].over();

        this.buttons[0].input.enabled = this.buttons[1].input.enabled = this.buttons[2].input.enabled = true;
        this.returnBtn.input.enabled = false;
    },

    resize: function()
    {
        this.game.width = this.game.world.width = $('#about').width();
        this.game.height = this.game.stage.height = this.game.world.height = $('#about').height();

        var _centerX = this.game.width * 0.5;
        this.logo.x = this.ctrlMap.x = this.help.x = this.mainMenu.x = _centerX;

        var _contentH = 236 + this.mainMenu.height;
        var _margin = (window.Game.height - _contentH) * 0.25;
        this.logo.y = _margin + 236;

        this.ctrlMap.y = this.help.y = this.mainMenu.y = this.logo.y + _margin;

        this.ground.y = this.game.height - 64;
    },

    // Phaser.Game.State interface
    destroy: function()
    {
        this.cache.destroy();
        //this.game.cache = new Phaser.Cache( this.game );
        this.game.load.reset();
        this.game.load.removeAll();
        this.game = null;
    }
};

export default menuGame;
