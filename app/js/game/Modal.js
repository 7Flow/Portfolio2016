/**
 * A 9-slice-scaling modal window.
 * It needs 9 textures in the GUI atlas:
 * - corners: top-left, top-right, bottom-right, bottom-left
 * - borders: top, right, bottom, left
 * It extends Phaser.Graphics.
 *
 * @class Modal
 * @constructor
 * @param game
 * @param x
 * @param y
 * @param w
 * @param h
 */
var Modal = function( game, x, y, w, h )
{
    // init object (not initialized as prototype var, avoid sharing object across instances)
    this.corners = [];
    this.borders = [];

    this.init( game, x, y, w, h );

    /**
     * Public setter of modal's width.
     */
    Object.defineProperty( this, 'width', {
        set: function(num) {
            this._width = num;
            this._size();
        }
    } );

    /**
     * Public setter of modal's height.
     */
    Object.defineProperty( this, 'height', {
        set: function(num) {
            this._height = num;
            this._size();
        }
    } );

    this.visible = false;
};

Modal.prototype = Object.create( Phaser.Graphics.prototype );
Modal.prototype.constructor = Modal;

/**
 * Modal's width (corresponding to the minimal width of the popin, so 2 times corner size).
 * @type {number}
 * @private
 */
Modal.prototype._width = 20;
/**
 * Modal's height (corresponding to the minimal width of the popin, so 2 times corner size).
 * @type {number}
 * @private
 */
Modal.prototype._height = 20;

/**
 * Corner size (corner is a square).
 * @type {number}
 */
Modal.prototype.cornerSize = 10;

/**
 * Text of the modal.
 * It will be automatically wrapped inside the modal.
 * @type {Phaser.Text}
 */
Modal.prototype.txt = null;

/**
 * Margin from top left corner.
 * Text width will be modal width less 2 times cornerSize less 2 times margin
 * @type {int}
 */
Modal.prototype.margin = 5;


/**
 * Contains all borders (elements scaled to fit dimensions): top, bottom, left, right.
 * @type {Array}
 */
Modal.prototype.borders = null;

/**
 * Contains all corners (elements not scaled): topL, bottomL, topR, bottomR.
 * @type {Array}
 */
Modal.prototype.corners = null;

/**
 * The central sprite, scaled in x & y, that represent the modal background.
 * @type {Phaser.Sprite}
 */
Modal.prototype.background = null;

/**
 *
 * @param game
 * @param x
 * @param y
 * @param w
 * @param h
 */
Modal.prototype.init = function( game, x, y, w, h )
{
    Phaser.Graphics.call( this, game, x, y );

    this._width = w;
    this._height = h;

    this.background = game.make.image(this.cornerSize, this.cornerSize, 'gui', 'modal-bg.png' );
    this.addChild( this.background );

    var _bordersPrefix = ['top', 'right', 'bottom', 'left'];
    var _cornersPrefix = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
    var _s = '.png';

    // loop from topLeft -> topRight -> bottomRight -> bottomLeft
    for (var i=0; i<4; ++i) {
        var _corner = game.make.image(0, 0, 'gui', _cornersPrefix[i] + _s);
        _corner.smoothed = false;
        this.corners.push( _corner );
        this.addChild( _corner );

        var _border = game.make.image(0, 0, 'gui', _bordersPrefix[i] + _s);
        _border.smoothed = false;
        this.borders.push(_border);
        this.addChild( _border );
    }
    game.groups.gui.add( this );
};

/**
 * Display the modal.
 * Default animation will make the modal expand from top-left corner the bottom-right.
 * @param {float} duration Duration, in seconds, before close. If 0, no auto close.
 */
Modal.prototype.show = function( duration )
{
    var _w = this._width;
    var _h = this._height;

    this._width = this._height = this.cornerSize + this.cornerSize;
    this.setSize( this._width, this._height );

    this.visible = true;

    window.Game.add.tween(this).to( {_width: _w}, 500, Phaser.Easing.Cubic.Out, true);
    var t = window.Game.add.tween(this).to( {_height: _h}, 500, Phaser.Easing.Cubic.Out, true);
    t.onUpdateCallback( this._size, this );

    if (this.txt) {
        this.txt.alpha = 0;
        var t2 = window.Game.add.tween(this.txt).to( {alpha: 1}, 250, Phaser.Easing.Cubic.Out, true, 400);
        //t2.onComplete.add( this._onShow, this );
    } else {
        //t.onComplete.add( this._onShow, this );
    }

    if (duration && duration > 0) {
        if (this.timer) this.game.time.events.remove( this.timer );
        this.timer = this.game.time.events.add( Phaser.Timer.SECOND * duration, this.hide, this);
    }

    //window.Game.state.getCurrentState().freeze();
};

Modal.prototype._onShow = function()
{
    window.Game.paused = true;
};

/**
 * Hide the modal.
 * By default, no animation.
 */
Modal.prototype.hide = function()
{
    this.visible = false;
    //this._onHide();
};

Modal.prototype._onHide = function()
{
    window.Game.state.getCurrentState().unFreeze();
    window.Game.paused = false;
};

/**
 * Set the dimensions of the modal, without animation.
 * @param {int} w
 * @param {int} h
 */
Modal.prototype.setSize = function( w, h )
{
    var _x = 0;
    var _y = 0;
    var _w = w - this.cornerSize - this.cornerSize;
    var _h = h - this.cornerSize - this.cornerSize;

    // loop from topLeft -> topRight -> bottomRight -> bottomLeft
    for (var i=0; i<4; ++i) {
        var _corner = this.corners[i];
        _corner.x = _x;
        _corner.y = _y;
        if (i == 0) _x += this.cornerSize;
        else if (i == 1) _y += this.cornerSize;
        else if (i == 2) _x -= _w;
        else _y -= _h;

        var _border = this.borders[i];
        _border.x = _x;
        _border.y = _y;
        if (i == 0) {
            _border.width = _w;
            _x += _w;
        } else if (i == 1) {
            _border.height = _h;
            _y += _h;
        } else if (i == 2) {
            _border.width = _w;
            _x -= this.cornerSize;
        } else {
            _border.height = _h;
        }
    }

    this.background.width = _w;
    this.background.height = _h;
};

/**
 * Set modal dimensions, according to the private _width & _height parameters.
 * Internally used as callback of the update Tween animation on show.
 * @private
 */
Modal.prototype._size = function()
{
    this.setSize( this._width, this._height );
};

/**
 * Set or change the modal's text.
 * @TODO Makes the font style configurable.
 * @param {string} str The text.
 * @param {int} size The font size.
 */
Modal.prototype.text = function( str, size )
{
    if (this.txt) {
        this.txt.destroy();
    }

    var _style = {
        font: 'press_start_2pregular',
        fontSize: size,
        align: 'left',
        stroke: '#000000',
        strokeThickness: 4,
        wordWrapWidth: this._width - this.cornerSize - this.cornerSize - this.margin - this.margin,
        wordWrap: true
    };

    this.txt = new Phaser.Text( window.Game, this.cornerSize + this.margin, this.cornerSize + this.margin, str, _style);

    //  gradient
    var grd = this.txt.context.createLinearGradient(0, 0, 0, this.txt.canvas.height);
    grd.addColorStop(0, '#FFFFFF');
    grd.addColorStop(1, '#999999');
    this.txt.fill = grd;
    this.txt.alpha = 0;

    this.addChild( this.txt );
};
