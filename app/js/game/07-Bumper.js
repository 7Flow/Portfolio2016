/**
 * Spring item
 * @param game
 * @param x
 * @param y
 * @param data: sprite & power parameters
 * @constructor
 * @extends Hittable
 */
Bumper = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.body.setSize(56, 42, 4, 22);
    this.body.checkCollision.left = this.body.checkCollision.right = this.body.checkCollision.down = false;

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add( this.bump, this );
};
Bumper.prototype = Object.create( Hittable.prototype );
Bumper.prototype.constructor = Bumper;

Bumper.prototype.bump = function( bumper, player )
{
    this.frameName = this.data.on;
    this.game.time.events.add( Phaser.Timer.SECOND * 0.2, this.reset, this);

    player.position.y = this.position.y - 1;
    player.body.velocity.y = Math.min(-320, -player.body.newVelocity.y * this.data.power);
};

Bumper.prototype.reset = function( bumper, player )
{
    this.frameName = this.data.off;
};