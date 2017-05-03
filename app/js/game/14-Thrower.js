/**
 * Triggerable sprite that holds a loot
 * @param game
 * @param x
 * @param y
 * @param data
 * @constructor
 * @extends Walker
 */
Thrower = function( game, x, y, data )
{
    this.game = game;
    this.data = data.data;
    this.texture = data.texture;

    this.position = {
        x: x + this.data.offset.x,
        y: y + this.data.offset.y
    };

    this.data.group = this.game.state.getCurrentState().getAmmoGroup( this.data.group, "bullet");
    this.data.group.classType = Bullet;

    this.game.time.events.add( Phaser.Timer.SECOND * this.data.delay, this.throw, this);
};

Thrower.prototype = Object.create( {} );
Thrower.prototype.constructor = Thrower;

Thrower.prototype.data = null;

Thrower.prototype.throw = function()
{
    var _go = this.data.group.create( this.position.x, this.position.y, this.texture.atlas, this.texture.id );
    if (this.data.name) _go.name = this.data.name;

    _go.lifespan = 3000;
    _go.anchor.set(0.5, 0.6);

    _go.body.mass = 1;
    _go.body.velocity.x = this.data.velocity.x;
    _go.body.velocity.y = this.data.velocity.y;

    this.game.time.events.add( Phaser.Timer.SECOND / this.data.rof, this.throw, this);
};