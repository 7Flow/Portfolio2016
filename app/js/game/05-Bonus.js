/**
 * Hittable sprite that holds a loot
 * @param game
 * @param x
 * @param y
 * @param data: sprite & loot parameters (must contain an equipment object)
 * @constructor
 * @extends Hittable
 */
Bonus = function( game, x, y, data )
{
    this.init( game, x, y, data );

    this.type = this.data.type;
    this.num = this.data.num;
};
Bonus.prototype = Object.create( Hittable.prototype );
Bonus.prototype.constructor = Bonus;

// number of loot containing
Bonus.prototype.num = 1;
// type of generation:
// - creator: build sprite on demand
// - revealator: find existing sprite and make it appears
Bonus.prototype.type = "revealator";

Bonus.prototype.hit = function()
{
    if (this.num > 0) {
        --this.num;

        if (this.type == "creator") {
            var _go = this.game.groups[ this.data.group ].create( this.position.x, this.position.y, this.data.id );
            if (this.data.name) _go.name = this.data.name;
            var tween = this.game.add.tween(_go).to( { y: _go.position.y - this.game.data.tileSize }, 1000, Phaser.Easing.Cubic.Out, true );
        } else {
            var _go = this.game.findInGroup(this.data.group, this.data.name);
            var tween = this.game.add.tween(_go).to({ y: this.position.y }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add( function() {
                _go.body.mass = 1;
                _go.body.allowGravity = true;
                _go.body.velocity.x = 50;
                _go.walking = true;
            });
            this.frameName = this.data.hit;
        }
    }
};