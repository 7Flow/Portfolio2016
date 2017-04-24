/**
 * Platform walker
 * @param Phaser.Game game
 * @param float x The x tile coordinates (left start). Must be multiplied by game.data.tileSize to have pixel position.
 * @param float y The y tile coordinates (bottom start). Must be multiplied by game.data.tileSize to have pixel position.
 * @param Object data The custom data (must contains a texture object)
 * @constructor
 * @extends Phaser.Sprite
 */
Walker = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.body.bounce.setTo(1, 0);
    this.body.allowGravity = false;
};

Walker.prototype = Object.create( Phaser.Sprite.prototype );
Walker.prototype.constructor = Walker;

/**
 * The direction of the Walker (-1 for looking left, 1 for looking right).
 * @type {number}
 */
Walker.prototype.dir = 1;
/**
 * An object describing the walkable area :
 * int x A world's tile coordinate
 * int y A world's tile coordinate
 * int width A world's tile length
 * - don't make default param, cause it will break inheritence (each instance should have its own object, not shared the same) -
 * @type {object}
 */
Walker.prototype.walkableArea = null;
/**
 * Is the Walker walking.
 * @type {boolean}
 */
Walker.prototype.walking = false;
/**
 * Indicates if the Walker is on an "edge" of the walkable area (-1 for left edge, 1 for right, 0 for none).
 * @type {number}
 */
Walker.prototype.onEdge = 0;

/**
 * Init (separate building process from constructor to make extends easier)
 * @param {Phaser.Game} game
 * @param x
 * @param y
 * @param {object} data Custom data
 */
Walker.prototype.init = function( game, x, y, data )
{
    if (data.texture.atlas) {
        Phaser.Sprite.call( this, game, x, y, data.texture.atlas, data.texture.id );
    } else {
        Phaser.Sprite.call( this, game, x, y, data.texture.id );
    }
    this.anchor.set( 0.5, 1 );
    this.smoothed = false;

    game.physics.arcade.enable( this );
    this.body.immovable = false;
    this.body.collideWorldBounds = true;

    // adjust x & y according to the anchor position
    this.position.x += game.data.tileSize * this.anchor.x;
    this.position.y += game.data.tileSize * this.anchor.y;

    this.walkableArea = {
        left: data.area.x * game.data.tileSize + (this.anchor.x * this.body.width),
        right: (data.area.x + data.area.width) * game.data.tileSize - ((1 - this.anchor.x) * this.body.width),
        y: data.area.y,
        width: data.area.width,
        height: 1
    };
};

Walker.prototype.update = function()
{
    if (this.walking && !this.onWalkableArea()) {
        this.dir *= -1;
        this.body.velocity.x = -this.body.velocity.x;
    }
};

/**
 * Get the current world's tile (rounded to lowest)
 * @returns {{x: number, y: number}}
 */
Walker.prototype.getTile = function()
{
    // body position is top-left, but this position is the anchor
    return {
        x: Math.floor( this.position.x / this.game.data.tileSize ),
        y: Math.floor( (this.game.data.world.height * this.game.data.tileSize - this.position.y) / this.game.data.tileSize )
    }
};

/**
 * Is the Walker on the walkable area
 * @returns {boolean}
 */
Walker.prototype.onWalkableArea = function()
{
    var _y = Math.floor( (this.game.data.world.height * this.game.data.tileSize - this.position.y) / this.game.data.tileSize );
    if (_y != this.walkableArea.y) {
        this.walking = false;
        return true;
    } else {
        // body position is top-left, but this position is the anchor
        if (this.dir < 0 && this.position.x < this.walkableArea.left) {
            this.position.x = this.walkableArea.left;
            this.onEdge = -1;
            return false;
        }
        if (this.dir > 0 && this.position.x > this.walkableArea.right) {
            this.position.x = this.walkableArea.right;
            this.onEdge = 1;
            return false;
        }
        this.onEdge = 0;
        return true;
    }
};
