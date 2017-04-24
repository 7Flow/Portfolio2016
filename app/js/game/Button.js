/**
 * Button, composed by a label, and a random polygon in background.
 *
 * @class Button
 * @constructor
 * @param game
 * @param x
 * @param y
 * @param w
 * @param h
 * @param {string} label
 * @param {number} id
 * @extends Phaser.Button
 */
var Button = function( game, x, y, w, h, label, id )
{
    this.init( game, x, y, w, h, label, id );
};

Button.prototype = Object.create( Phaser.Button.prototype );
Button.prototype.constructor = Button;

/**
 * Label of the button.
 * @type {Phaser.Text}
 */
Button.prototype.txt = null;

/**
 * Amount (in pixels) of random for each background's point
 * @type {int}
 */
Button.prototype.margin = 20;

/**
 * Downscale of the background, to create a crisp (pixellate) effect.
 * @TODO need a setter to calculate these 2 internals values
 * @type {number}
 */
Button.prototype.downScale = 0.25;
Button.prototype.upScale = 4;

Button.prototype._tween = null;

Button.prototype._over = false;

/**
 * Init (separate building process from constructor to make extends easier)
 * @param {Phaser.Game} game
 * @param x
 * @param y
 * @param w
 * @param h
 * @param {string} label
 * @param {number} id
 */
Button.prototype.init = function( game, x, y, w, h, label, id )
{
    Phaser.Button.call( this, game, x, y );
    this.input.useHandCursor = true;
    this.inputEnabled = true;
    this.hitArea = new Phaser.Rectangle(0,0, w,h);

    this.data.id = id;

    this._width = w;
    this._height = h;

    this._bg = new Phaser.Graphics( game, 0, 0 );
    this._bg.inputEnabled = false;

    if (label) {
        this.text( label, 20 );
        this.text.inputEnabled = false;
    }
};

/**
 * Update bg
 */
Button.prototype.updateBg = function()
{
    var _margin = this.margin * this.downScale;
    // store first point to close the polygon
    var _fx = Math.random() * _margin;
    var _fy = Math.random() * _margin;

    var _w = (this._width * this.downScale) - _margin;
    var _h = (this._height * this.downScale) - _margin;
    // no need to calculate the complete bounding box, just need top-left offset
    var _offset = {x: 0, y: 0};

    this._bg.beginFill( 0xff9100, 1 );
    // top-left
    this._bg.moveTo( _fx, _fy );
    // top-right
    var _py = Math.random() * _margin;
    _offset.y = Math.min(_fy, _py);
    this._bg.lineTo( _w + Math.random() * _margin, _py );
    // bottom-right
    this._bg.lineTo( _w + Math.random() * _margin, _h + Math.random() * _margin );
    // bottom-left
    var _px = Math.random() * _margin;
    _offset.x = Math.min( _fx, _px );
    this._bg.lineTo( _px, _h + Math.random() * _margin );
    this._bg.lineTo( _fx, _fy );
    this._bg.endFill();

    if (this.background) {
        this.background.texture = this._bg.generateTexture(1, Phaser.scaleModes.NEAREST);
    } else {
        this.background = this.game.add.image( 0, 0, this._bg.generateTexture(1, Phaser.scaleModes.NEAREST) );
        this.background.anchor.set( 0.5, 0.5 );
        this.background.smoothed = false;
        this.addChildAt( this.background, 0 );
    }

    this.__width = this._bg.width * this.upScale;

    this.background.width = 0;
    this.background.height = this._bg.height * this.upScale;

    this.background.x = this._width * 0.5 + _offset.x * this.upScale;
    this.background.y = this._height * 0.5 + _offset.y * this.upScale;

    this._bg.clear();
};

/**
 * Over/Focus animation.
 * Make the background appears.
 */
Button.prototype.over = function()
{
    if (!this._over) {
        this._over = true;
        this.updateBg();

        if (this._tween) this._tween.stop();
        this._tween = window.Game.add.tween(this.background).to( {width: this.__width}, 250, Phaser.Easing.Cubic.Out, true);
    }
};

/**
 * Out/Blur animation.
 */
Button.prototype.out = function()
{
    if (this._over) {
        this._over = false;
        if (this._tween) this._tween.stop();
        this._tween = window.Game.add.tween(this.background).to({width: 0}, 250, Phaser.Easing.Cubic.Out, true);
    }
};

/**
 * Set or change the label.
 * @TODO Makes the font style configurable.
 * @param {string} str The text.
 * @param {int} size The font size.
 */
Button.prototype.text = function( str, size )
{
    if (this.txt) {
        this.txt.destroy();
    }

    var _style = {
        font: 'press_start_2pregular',
        fontSize: size,
        align: 'left',
        stroke: '#000000',
        strokeThickness: 4
    };

    this.txt = new Phaser.Text( this.game, 0, 0, str, _style);
    this.txt.anchor.set(0.5, 0.5);
    this.txt.x = this._width * 0.5;
    this.txt.y = this._height * 0.5 + 10;

    //  gradient
    var grd = this.txt.context.createLinearGradient(0, 0, 0, this.txt.canvas.height);
    grd.addColorStop(0, '#FFFFFF');
    grd.addColorStop(1, '#999999');
    this.txt.fill = grd;

    this.addChild( this.txt );
};
