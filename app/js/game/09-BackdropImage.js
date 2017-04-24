/**
 * BackdropImage
 * @param game
 * @param data
 * @constructor
 * @extends Phaser.Image
 */
BackdropImage = function( game, x, y, data )
{
    this.init( game, x, y, data );
};
BackdropImage.prototype = Object.create( Phaser.Image.prototype );
BackdropImage.prototype.constructor = BackdropImage;


BackdropImage.prototype.init = function( game, x, y, data )
{
    Phaser.Image.call( this, game, x, y, data.texture.atlas, data.texture.id );
    this.game = game;
    this.data = data.data;
    this.data.start = {
        x: this.position.x,
        y: this.position.y
    };
};

BackdropImage.prototype.update = function( x, y )
{
    this.position.x = this.data.start.x - x * this.data.ratioX;
    this.position.y = this.data.start.y - y * this.data.ratioY;
};