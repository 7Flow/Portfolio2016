/**
 * Sprite with an animation
 * @param game
 * @param x
 * @param y
 * @param data animation parameters (prefix, length, fps)
 * @constructor
 * @extends Walker
 */
MovingPlatform = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.body.setSize(64, 32, 0, 0);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;

    this.walking = true;
    this.speed = data.data.speed;

    this._lastPosition = {x: x, y: y};
};

MovingPlatform.prototype = Object.create( Walker.prototype );
MovingPlatform.prototype.constructor = MovingPlatform;

MovingPlatform.prototype.speed = 5;

MovingPlatform.prototype._lastPosition = null;

MovingPlatform.prototype.update = function()
{
    this._lastPosition.x = this.position.x;
    this._lastPosition.y = this.position.y;

    if (this.walking) {
        if (!this.onWalkableArea()) {
            if (!this.data.waiting) {
                this.reverse();
            } else {
                this.walking = false;
                this.game.time.events.add( Phaser.Timer.SECOND * this.data.wait, this.reverse, this);
            }
        } else {
            this.position[this.walkableArea.axis] += this.speed * this.dir;
        }
    }
};

MovingPlatform.prototype.moveWith = function( player )
{
    var _delta = this.position[this.walkableArea.axis] -  this._lastPosition[this.walkableArea.axis];
    player.position[this.walkableArea.axis] += _delta;
};