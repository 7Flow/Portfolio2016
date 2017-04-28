
var menuOver = function(game) {
    this.game = game;
};

menuOver.prototype = {

    game: null,

    // Phaser.Game.State interface
    create: function()
    {
        console.log('create');

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

        var _txt = new Phaser.Text( this.game, -74, 0, "GAME OVER", _style);
        var grd = _txt.context.createLinearGradient(0, 0, 0, _txt.canvas.height);
        grd.addColorStop(0, '#9999cc');
        grd.addColorStop(1, '#990000');
        _txt.fill = grd;

        this.mainMenu.add( _txt );

        // REPLAY
        var _start = new Button( this.game, -128, 128, 256, 64, "REJOUER", 0 );
        _start.over();
        this.mainMenu.add( _start );

        // enable mouse only on main menu
        _start.onInputDown.add( this.restart, this );

        $('#about').trigger('state:created');
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

        var _contentH = this.mainMenu.height;
        var _margin = (window.Game.height - _contentH) * 0.5;
        this.mainMenu.y = _margin;
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
