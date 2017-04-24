/**
 * Hittable sprite that holds a loot
 * @param game
 * @param x
 * @param y
 * @param data: sprite & loot parameters
 * @constructor
 * @extends Hittable
 */
Breakable = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.life = this.game.data.materials[ this.data.material ].life;
};
Breakable.prototype = Object.create( Hittable.prototype );
Breakable.prototype.constructor = Breakable;

Breakable.prototype.life = 1;

Breakable.prototype.hit = function()
{
    if (this.life > 1) {
        --this.life;
        this.frameName = this.game.data.materials[ this.data.material ].frames[ this.life-1 ];
    } else {
        this.destroy();
    }
};