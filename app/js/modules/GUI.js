
var GUI = function(game)
{
    this.game = game;

    // top-left player status
    // - create hearts
    var _x = 30;

    this.hearts = [];
    for (var i=0; i<3; ++i) {
        this.hearts.push( game.groups.gui.create(_x, 50, 'gui', 'heart.png') );
        _x += 30;
    }

    this.lives = this.game.add.text( _x+10, 82, "x"+this.game.data.life, null, this.game.groups.gui);
    this.lives.anchor.setTo(0, 1);
    this.lives.font = 'press_start_2pregular';
    this.lives.fontSize = 20;
    this.lives.fill = '#ffffff';
    // outline
    this.lives.align = 'left';
    this.lives.stroke = '#000000';
    this.lives.strokeThickness = 4;

    // game info
    this.infosWindow = new Modal( game, (game.width - 350) * 0.5, 50, 350, 100 );

    // pause layer
    this.pauseLayer = new Layer( game );
    this.pauseLayer.text( "PAUSE", 20 );

    game.groups.gui.fixedToCamera = true;
};

GUI.prototype = {

    hearts: [],

    infosWindow: null,
    pauseLayer: null,

    /**
     * Update hearts after losing health point.
     * @param index The number of life remaining. As hearts are 0 based, it corresponds to the lost heart index.
     */
    lostHealth: function( index )
    {
        this.hearts[index].frameName = 'heart-loss.png';
    },

    /**
     * @param num The number of life remaining.
     */
    lostLife: function( num )
    {
        this.lives.text = "x"+num;
    },

    /**
     * Handle the equipment
     * @param data
     */
    equip: function( data )
    {
        if (!this.weapon) {
            var _y = this.game.height - 30;
            this.weapon = this.game.groups.gui.create(30, _y-10, 'gui', 'barrel-6.png');
            this.weapon.anchor.setTo(0, 1);

            var _p = 'barrel-';
            var _pR = 'barrel-roll-';
            var _s = '.png';
            var i, j;

            // can reload even if mag is not empty
            // create all reload case animation
            for (i=0; i<6; ++i) {
                // from i to j animation
                for (j=i+1; j<7; ++j) {
                    var _frames = [_p + i + _s, _p + i + _s, _p + i + _s];
                    for (var k=i; k<=j; ++k) {
                        _frames.push( _p + k + _s );
                    }
                    this.weapon.animations.add('reload-'+i+'-'+j, _frames, 6, false);
                }
            }

            // create all fire animations
            for (i=0; i<6; ++i) {
                this.weapon.animations.add('attack-'+i, [_pR+i+_s, _p+i+_s], 10, false);
            }

            this.mag = this.createText( 70, _y, data.current, 30 );
            this.createText( 100, _y, '/', 20 );
            this.ammos = this.createText( 118, _y, data.ammos, 14 );
        } else {
            this.mag.text = data.current;
            this.ammos.text = data.ammos;
        }
    },

    /**
     * Fire the current weapon
     * @param num: ammos remaining in the mag
     */
    action: function( num )
    {
        this.mag.text = num;
        this.weapon.animations.play( 'attack-'+num );
    },

    /**
     * Reload the current weapon
     * @param num: the num of ammo in the mag
     * @param total: the tot
     */
    reload: function( from, to, remain ) {
        this.weapon.animations.play('reload-' + from + '-' + to);
        this.to = to;
        this.remain = remain;

        this.waiting = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.reloading, this);
    },
    reloading: function()
    {
        this.mag.text = this.to;
        this.ammos.text = this.remain;
    },

    togglePause: function()
    {
        if (this.game.paused) {
            this.pauseLayer.hide();
        } else {
            this.pauseLayer.show();
        }
    },

    showInfos: function( text, duration )
    {
        this.infosWindow.text( text, 16 );
        this.infosWindow.show( duration );
    },

    createText: function( x, y, text, size )
    {
        var _txt = this.game.add.text(x, y, text, null, this.game.groups.gui);
        _txt.anchor.setTo(0, 1);
        _txt.font = 'press_start_2pregular';
        _txt.fontSize = size;

        //  gradient
        var grd = _txt.context.createLinearGradient(0, 0, 0, _txt.canvas.height);
        grd.addColorStop(0, '#FFB200');
        grd.addColorStop(1, '#B51F22');
        _txt.fill = grd;

        // outline
        _txt.align = 'left';
        _txt.stroke = '#000000';
        _txt.strokeThickness = 4;
        //_txt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        return _txt;
    },

    destroy: function()
    {
        this.weapon = null;
        this.hearts = [];
    }

};

export default GUI;