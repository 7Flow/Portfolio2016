/**
 * Triggerable sprite that holds a loot.
 * Need to be activated with 'action' button to deliver the loot.
 * Loot is launched upwards, with a vertical angle between -18 & 18 degrees (Math.atan2(1,3)).
 * It can only be activated once.
 * No animation, only
 * @param game
 * @param x
 * @param y
 * @param data: sprite & loot parameters (usually an equipment)
 * @constructor
 * @extends Phaser.Sprite
 */
Chest = function( game, x, y, data )
{
    if (data.texture.atlas) {
        Phaser.Sprite.call( this, game, x, y, data.texture.atlas, data.texture.id );
    } else {
        Phaser.Sprite.call( this, game, x, y, data.texture.id );
    }
    this.smoothed = false;
    this.anchor.set( 0, 1 );

    game.physics.arcade.enable( this );
    this.body.allowGravity = false;

    // adjust x & y according to the anchor position
    this.position.x += game.data.tileSize * this.anchor.x;
    this.position.y += game.data.tileSize * this.anchor.y;

    this.data = data;

    game.add.existing( this );
};

Chest.prototype = Object.create( Phaser.Sprite.prototype );
Chest.prototype.constructor = Chest;

Chest.prototype.open = false;

Chest.prototype.activate = function()
{
    if (!this.open) {
        this.open = true;
        this.frameName = this.data.on;

        var _loot = this.game.groups.collectable.create(this.position.x, this.position.y, "atlas", this.data.equipment.id);
        _loot.anchor.set(0.5, 1);

        _loot.position.x += this.game.data.tileSize * _loot.anchor.x;
        _loot.position.y -= this.game.data.tileSize * 0.6;

        _loot.body.bounce.y = 0.5;
        _loot.body.mass = 1;

        _loot.body.velocity.y = -300;
        _loot.body.velocity.x = Math.random() * 200 - 100;

        _loot.data = this.data.equipment;
    }
};

Chest.prototype.deactivate = function()
{

};