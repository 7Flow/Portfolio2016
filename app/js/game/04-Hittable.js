/**
 * Triggerable sprite that holds a loot
 * @param game
 * @param x
 * @param y
 * @param data: sprite & loot parameters (usually an equipment)
 * @constructor
 * @extends Phaser.Sprite
 */
Hittable = function( game, x, y, data )
{
    this.init( game, x, y, data );
};

Hittable.prototype = Object.create( Phaser.Sprite.prototype );
Hittable.prototype.constructor = Hittable;

Hittable.prototype.init = function( game, x, y, data ) {
    if (data.texture.atlas) {
        Phaser.Sprite.call( this, game, x, y, data.texture.atlas, data.texture.id );
    } else {
        Phaser.Sprite.call( this, game, x, y, data.texture.id );
    }
    this.smoothed = false;
    this.anchor.set( 0, 0 );

    game.physics.arcade.enable( this );
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.data = data.data;
};

Hittable.prototype.hit = function() {};