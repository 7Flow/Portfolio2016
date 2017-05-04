
var menuOver = function(game) {
    this.game = game;
};

menuOver.prototype = {

    game: null,

    // Phaser.Game.State interface
    create: function()
    {
        if (this.game.defaultCamera == null) {
            this.game.defaultCamera = this.game.camera;
        } else {
            this.game.camera = this.game.defaultCamera;
        }

        this.game.stage.backgroundColor = '#000000';
        // 8bit pixel style
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.cursors = this.game.input.keyboard.addKeys({
            'enter': Phaser.KeyCode.ENTER
        });
        this.cursors.enter.onUp.add( this.restart, this );

        // MAIN MENU
        this.mainMenu = this.game.add.group();

        // GAME OVER
        var _style = {
            font: 'press_start_2pregular',
            fontSize: 32,
            align: 'left',
            stroke: '#ffffff',
            fill: '#9999cc',
            strokeThickness: 4
        };

        var _txt = new Phaser.Text( this.game, -144, -600, "GAME OVER", _style);
        var grd = _txt.context.createLinearGradient(0, 0, 0, _txt.canvas.height);
        grd.addColorStop(0, '#fe493a');
        grd.addColorStop(1, '#dd070c');
        _txt.fill = grd;
        this.game.add.tween( _txt ).to( {y: -50}, 1200, Phaser.Easing.Bounce.Out, true, 250 );

        this.mainMenu.add( _txt );
        this.mainMenu.visible = true;

        // REPLAY
        var _start = new Button( this.game, -128, 50, 256, 64, "REJOUER", 0 );
        _start.over();
        _start.alpha = 0;
        this.mainMenu.add( _start );
        this.game.add.tween( _start ).to( {alpha: 1}, 750, Phaser.Easing.Bounce.Out, true, 750 );

        // enable mouse only on main menu
        _start.onInputDown.add( this.restart, this );

        $('#about').trigger('state:created');
    },

    update: function()
    {

    },

    restart: function()
    {
        this.game.state.start("Play");
    },

    resize: function()
    {
        this.game.width = this.game.world.width = $('#about').width();
        this.game.height = this.game.stage.height = this.game.world.height = $('#about').height();

        var _centerX = this.game.width * 0.5;
        this.mainMenu.x = _centerX;

        var _centerY = this.game.height * 0.5;
        this.mainMenu.y = _centerY;
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

export default menuOver;
