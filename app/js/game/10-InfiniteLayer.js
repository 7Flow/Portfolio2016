/**
 * InfiniteLayer
 * @param game
 * @param data
 * @constructor
 * @extends Phaser.TileSprite
 */
InfiniteLayer = function( game, x, y, data )
{
    this.init( game, x, y, data );
};

InfiniteLayer.prototype = Object.create( Phaser.TileSprite.prototype );
InfiniteLayer.prototype.constructor = InfiniteLayer;

InfiniteLayer.prototype.init = function( game, x, y, data )
{
    var _image = new Phaser.Image(game, 0,0, data.texture.atlas, data.texture.id );
    Phaser.TileSprite.call( this, game, x, Math.round(y), game.width, _image.height, _image.texture );
    this.smoothed = false;

    this.data = data.data;

    this.data.start = {
        x: this.position.x,
        y: this.position.y
    };
};

InfiniteLayer.prototype.update = function( x, y )
{
    this.tilePosition.x = this.data.start.x - x * this.data.ratioX;
    this.y = this.data.start.y - y * this.data.ratioY;
};

InfiniteLayer.prototype.resize = function()
{
    this.width = window.Game.width;
};