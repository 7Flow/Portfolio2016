/**
 * Basic bullet. Lighter than Phaser.Bullet (and don't need a Weapon or BulletManager)
 * @param game
 * @param x
 * @param y
 * @param data
 * @constructor
 * @extends Walker
 */
Bullet = function( game, x, y, key, frame )
{
    this.game = game;

    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.anchor.set(0.7, 0.5);
    this.smoothed = false;

    game.physics.arcade.enable(this);
    this.body.immovable = false;
    this.body.collideWorldBounds = true;
};

Bullet.prototype = Object.create( Phaser.Sprite.prototype );
Bullet.prototype.constructor = Bullet;

Bullet.prototype.data = null;

Bullet.prototype.update = function()
{
    if (!this.exists) return;

    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};