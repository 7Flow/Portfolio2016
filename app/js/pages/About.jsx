import Page from '../modules/Page.jsx';

import GameMenu from '../modules/GameMenu.js';
import GamePlay from '../modules/GamePlay.js';
import GameOver from '../modules/GameOver.js';

class About extends Page
{
    tpl = 'app/tpl/about.html';
    $el = $('#about');
    json = 'json/about.json';

    jsonLoaded( data )
    {
        var _loader = new createjs.LoadQueue(false);
        _loader.on("fileload", this.udpateLoading, this);
        _loader.on("complete", this.loadFont, this);
        var _manifest = [];

        this.percent += this.jsonPercent;
        this.data = data;

        // preload atlas textures + json
        var l = 0;
        for (var state in data.textures) {
            for (var id in data.textures[state]) {
                _manifest.push({id: id, src: data.textures[state][id].path});
                ++l;
                if (data.textures[state][id].json) {
                    _manifest.push({id: id + "json", src: data.textures[state][id].json});
                    ++l;
                }
            }
        }

        // keep 10% for the font (env. 7kb)
        this.assetPercent = ((90 - this.jsonPercent) / l);

        _loader.loadManifest( _manifest );

        $('#loading').add('animate').attr( 'value', this.percent );
    }

    loadFont()
    {
        WebFont.load({
            custom: {
                families: ['press_start_2pregular'],
                urls: ['fonts/pressstart2p.css']
            },
            active: this.loaded.bind( this )
        });
    }

    init()
    {
        var w = this.$el.width();
        var h = this.$el.height();

        this.$el.on('state:created', this.resize.bind(this) );

        this.game = new Phaser.Game( w, h, Phaser.CANVAS, this.$el.attr('id') );
        this.game.state.add("Menu", GameMenu);
        this.game.state.add("Play", GamePlay);
        this.game.state.add("Over", GameOver);

        this.game.state.states.Menu.data = this.game.state.states.Play.data = this.data;

        this.game.state.start("Menu");

        window.Game = this.game;
    }

    resize()
    {
        var w = this.$el.width();
        var h = this.$el.height();
        this.game.width = w;
        this.game.height = h;

        if (this.game.renderType === Phaser.CANVAS) {
            Phaser.Canvas.setSmoothingEnabled( this.game.context, false );
        }

        this.game.renderer.resize( w, h );
        this.game.camera.setSize( w, h );
        this.game.state.getCurrentState().resize();
    }

    freeze()
    {
        this.game.paused = true;
    }
    unfreeze()
    {
        this.game.paused = false;
    }

    clear()
    {
        this.$el.off('state:created');

        this.game.state.getCurrentState().destroy();
        this.game.state.destroy();
        this.game.destroy();
        this.game = null;
    }
}

export default About;