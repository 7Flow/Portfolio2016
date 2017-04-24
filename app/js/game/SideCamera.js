/**
 * Side scroller camera
 *
 * @class SideCamera
 * @constructor
 * @param {Phaser.Game} game - Game reference to the currently running game.
 * @param {number} id - Not being used at the moment, will be when Phaser supports multiple camera
 * @param {number} x - Position of the camera on the X axis
 * @param {number} y - Position of the camera on the Y axis
 * @param {number} width - The width of the view rectangle
 * @param {number} height - The height of the view rectangle
 * @extends Phaser.Camera
 */
var SideCamera = function( game, id, x, y, width, height )
{
    Phaser.Camera.call( this, game, id, x, y, width, height );
};

SideCamera.prototype = Object.create( Phaser.Camera.prototype );
SideCamera.prototype.constructor = SideCamera;

/**
 * The look direction (-1: left, 1: right)
 * @type {number}
 * @private
 */
SideCamera.prototype.look = 1;

/**
 * Has the looking direction changed.
 * @type {boolean}
 */
SideCamera.prototype.hasChangedLook = true;

/**
 * Time elapsed from a changing direction to look forward (3 tiles forward).
 * @type {number}
 */
SideCamera.prototype.lookChangedThreshold = 1.5;

/**
 *
 * @type {number}
 * @private
 */
SideCamera.prototype.lookChanged = -1.5;

SideCamera.prototype.lookBounds = {
    minX: 0,
    offsetX: 0,
    forward: 0
};
SideCamera.prototype.lookTarget = {
    x: 0,
    y: 0,
    object: null
};


/**
 *
 * @param {int} dir
 */
SideCamera.prototype.lookTo = function( dir )
{
    if (this.look != dir) {
        this.look = dir;
        this.hasChangedLook = true;
        this.lookBounds.forward = 0;
        this.lookChanged = this.game.time.totalElapsedSeconds();
    }
};

SideCamera.prototype.update = function()
{
    // move camera
    if (this.hasChangedLook && this.game.time.totalElapsedSeconds() - this.lookChanged > this.lookChangedThreshold) {
        this.lookBounds.forward = 3 * this.game.data.tileSize * this.look;
        this.hasChangedLook = false;
    }
    this.lookTarget.x = this.lookTarget.object.x + this.lookBounds.forward + this.lookBounds.offsetX;

    this.x += (this.lookTarget.x - this.x) * 0.04;
    this.y = this.lookTarget.object.y;

    Phaser.Camera.prototype.update.call( this );
};
