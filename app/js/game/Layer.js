/**
 * An absolute layer above the game.
 * It extends Phaser.Graphics.
 *
 * @class Layer
 * @constructor
 * @param game
 */
var Layer = function( game )
{
    this.init( game );
    this.visible = false;
};

Layer.prototype = Object.create( Phaser.Graphics.prototype );
Layer.prototype.constructor = Layer;

/**
 * Text of the modal.
 * It will be automatically wrapped inside the modal.
 * @type Phaser.Text
 */
Layer.prototype.txt = null;

/**
 * The central sprite, scaled in x & y, that represent the modal background.
 * @type Phaser.Sprite
 */
Layer.prototype.background = null;

/**
 * Init (separate building process from constructor to make extends easier)
 * @param {Phaser.Game} game
 * @param {string} label
 */
Layer.prototype.init = function( game, label )
{
    Phaser.Graphics.call( this, game, 0, 0 );

    var _bg = new Phaser.Graphics( game, 0, 0 );
    _bg.beginFill(0x000000, 0.4);
    _bg.drawRect(0, 0, 100, 100);
    _bg.endFill();

    this.background = new Phaser.Sprite( game, 0, 0, _bg.generateTexture() );
    this.background.smooothed = false;
    this.addChild( this.background );

    if (label) this.text( label, 16 );

    game.groups.gui.add( this );

    this.resize();
};

/**
 * Display the layer.
 * No animation.
 */
Layer.prototype.show = function()
{
    this.visible = window.Game.paused = true;
};

/**
 * Hide the layer.
 * By default, no animation.
 */
Layer.prototype.hide = function()
{
    this.visible = window.Game.paused = false;
};

/**
 * Resize the layer to cover all the Stage.
 */
Layer.prototype.resize = function()
{
    this.background.width = window.Game.width;
    this.background.height = window.Game.height;

    if (this.txt) {
        this.txt.x = (window.Game.width - this.txt.canvas.width) * 0.5;
        this.txt.y = (window.Game.height - this.txt.canvas.height) * 0.5;
    }
};

Layer.prototype.text = function( str, size )
{
    var _style = {
        font: 'press_start_2pregular',
        fontSize: size,
        align: 'left',
        stroke: '#000000',
        strokeThickness: 4,
        wordWrap: false
    };

    this.txt = new Phaser.Text( window.Game, 0, 0, str, _style);

    //  gradient
    var grd = this.txt.context.createLinearGradient(0, 0, 0, this.txt.canvas.height);
    grd.addColorStop(0, '#FFFFFF');
    grd.addColorStop(1, '#999999');
    this.txt.fill = grd;

    this.txt.x = (window.Game.width - this.txt.width) * 0.5;
    this.txt.y = (window.Game.height - this.txt.height) * 0.5;

    this.addChild( this.txt );
};
