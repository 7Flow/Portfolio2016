
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

import Particle from '../utils/Particle.jsx';
import ParticleTrail from '../utils/ParticleTrail.jsx';

class Background {

    /** BACKGROUND
     *
     *
     */
    t = 0;
    num = 100;
    ctx;
    collected = 0;

    mx = 0;
    my = 0;
    mm = 100;

    particles = [];
    blackHole;
    w = 0;
    h = 0;

    container;
    canvas;
    context;
    frame = 0;

    paused = false;
    destroying = false;

    constructor( el, num )
    {
        this.num = num;
        // create canvas
        this.$el = $(el);
        this.canvas = document.createElement('canvas');
        //this.canvas.setAttribute('id', 'target');
        this.context = this.canvas.getContext( '2d' );

        el.appendChild( this.canvas );

        this.init();
    }

    init()
    {
        // init black hole position
        this.blackHole = new Particle( 300, 20, 0, 0, 'rgba(0,0,0,1)');
        this.resize();

        // create particles
        // position on blackhole "surface"
        for (var i = 0; i < this.num; ++i) {
            this.particles[i] = new ParticleTrail( 1 + Math.random()*3, 2.5, this.blackHole.x, this.blackHole.y, 'rgba(105,205,255,0.7)' );
        }

        /*this.dispFilter = document.querySelector("feImage");
        this.toBase64( "images/nmap.jpg", (data) => {
            this.dispFilter.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", data);
        });*/

        this.source = $("#source")[0];
        this.map = $("#map")[0];

        this.createSource();
        this.createMap();

        if (window.Uint8ClampedArray) {
            this.filter = new filters.DisplacementMap(this.source, this.map, this.canvas, new filters.Point(), 100, 100, filters.ColorChannel.RED, filters.ColorChannel.GREEN);
        }

        this.t = 0.8;
        this.moveBlackHole();

        this.renderProxy = $.proxy(this.render, this);
        requestAnimationFrame( this.renderProxy );
        this.bigBang();
    }

    createSource()
    {
        var context = this.source.getContext("2d");
        var imageSource = $("#img-source")[0];
        context.drawImage(imageSource, 0, 0, imageSource.width,  imageSource.height);
    }

    createMap()
    {
        var context = this.map.getContext("2d");
        var imageMap = $("#img-map")[0];
        context.drawImage(imageMap, 0, 0, imageMap.width,  imageMap.height);
    }

    moveBlackHole()
    {
        var mx = this.w * 0.5 + ( Math.cos( this.t * 2.1 ) * Math.cos( this.t * 0.9 ) * this.w * 0.45 );
        var my = this.h * 0.5 + ( Math.sin( this.t * 3.2 ) * Math.tan( Math.sin( this.t * 0.8 ) ) * this.h * 0.3 );
        this.blackHole.position( mx, my );

        if (this.filter) {
            this.filter.point.x = mx - 85;
            this.filter.point.y = my - 85;

            if (this.frame % 2 == 0) this.filter.draw();
        } else {
            this.context.globalCompositeOperation = "source-over";
            this.context.drawImage( document.getElementById('img-source'), 0, 0 );
            this.context.globalCompositeOperation = "overlay";
            this.blackHole.render( this.context );
        }
    }

    render()
    {
        // render each 2 frames
        if ( this.tog = !this.tog ) {
            this.moveBlackHole();

            var n;

            // increment time
            var _delta = 0.003;
            this.t += _delta;

            this.context.globalCompositeOperation = 'lighten';

            // move particles
            if (this.collected >= this.num) {
                this.bigBang();
            } else {
                for (var i = 0; i < this.num; ++i) {
                    var p = this.particles[i];
                    if (p.alive) {
                        p.move();
                        var _contact = p.applyGravity( this.blackHole, 4 );
                        p.render( this.context );

                        if (_contact) {
                            ++this.collected;
                        } else {
                            // rebounds
                            if (p.x < 0) p.speed.x = -p.speed.x;
                            if (p.y < 0) p.speed.y = -p.speed.y;

                            if (p.x > this.w) p.speed.x = -p.speed.x;
                            if (p.y > this.h) p.speed.y = -p.speed.y;
                        }
                    }
                }
            }
            ++this.frame;
        }

        if (!this.paused) {
            requestAnimationFrame( this.renderProxy );
        } else if (this.destroying) {
            this.doDestroy();
        }
    }

    bigBang()
    {
        this.collected = 0;
        var _radius = this.blackHole.radius + 2;

        for (var i = 0; i < this.num; ++i) {
            var p = this.particles[i];
            // random position on surface
            var _a = Math.random() * Math.PI * 2;
            p.position( this.blackHole.x + Math.cos(_a) * _radius, this.blackHole.y + Math.sin(_a) * _radius );
            // initial velocity
            p.randomImpulse( 18, 24, this.blackHole );
        }
    }

    toBase64( url, callback )
    {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL("image/png");
            callback( dataURL );
            canvas = null;
        };
        img.src = url;
    }

    resize()
    {
        this.w = 1800;
        this.h = 1164;
        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.blackHole.position( this.w * 0.5, this.h * 0.5 );
    }

    pause()
    {
        this.paused = true;
    }

    destroy()
    {
        if (this.paused) {
            this.doDestroy();
        } else {
            this.destroying = true;
        }
    }
    doDestroy()
    {
        this.canvas = this.context = this.blackHole = this.filter = null;
        this.$el.remove();
        this.$el = null;
    }
}

export default Background;