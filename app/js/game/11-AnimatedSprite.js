/**
 * AnimatedSprite
 * @param game
 * @param data
 * @constructor
 * @extends Phaser.Sprite
 */
AnimatedSprite = function( game, x, y, data )
{
    this.init( game, x, y, data );
};

AnimatedSprite.prototype = Object.create( Phaser.Sprite.prototype );
AnimatedSprite.prototype.constructor = AnimatedSprite;

AnimatedSprite.prototype.init = function( game, x, y, data )
{
    Phaser.Sprite.call( this, game, x, Math.round(y), data.texture.atlas, data.texture.id  );
    this.smoothed = false;

    game.physics.arcade.enable( this );
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.data = data.data;

    this.animations.add('loop', Phaser.Animation.generateFrameNames(this.data.prefix, 1, this.data.length, ".png"), this.data.fps, true);
    this.animations.play('loop');
};