/**
 * Backdrop group.
 * A fixed layer, composed by a background gradient, and backdrop Image.
 * @param game
 * @param data
 * @constructor
 * @extends Phaser.Group
 */
Backdrop = function( game, data )
{
    this.init( game, data );
    this.fixedToCamera = true;
};
Backdrop.prototype = Object.create( Phaser.Group.prototype );
Backdrop.prototype.constructor = Backdrop;

/**
 * @type {Phaser.Image}
 */
Backdrop.prototype.background = null;

Backdrop.prototype.init = function( game, data )
{
    this.game = game;
    this.data = data;
    Phaser.Group.call( this, game );
};

Backdrop.prototype.setBackground = function( colors )
{
    var _bmp = this.game.add.bitmapData(100, 200);
    var _gradient = _bmp.context.createLinearGradient(0,0,0,200);
    for (var i=0, l=colors.length; i<l; ++i) {
        _gradient.addColorStop( colors[i].point, colors[i].color );
    }
    _bmp.context.fillStyle = _gradient;
    _bmp.context.fillRect(0,0,100,200);

    this.background = this.game.add.image(0, 0, _bmp, null, this );
    this.background.width = this.game.width;
    this.background.height = this.game.data.world.height * this.game.data.tileSize;
};

Backdrop.prototype.update = function()
{
    // assume game camera is a SideCamera
    var _x = this.game.camera.x - this.game.state.getCurrentState().camera.lookBounds.minX;
    var _y = 0;

    for (var i=0, l=this.children.length; i<l; ++i) {
        this.children[i].update( _x, _y );
    }
};

Backdrop.prototype.resize = function()
{
    this.background.width = this.game.width;

    for (var i=0, l=this.children.length; i<l; ++i) {
        if (this.children[i].resize) this.children[i].resize();
    }
};