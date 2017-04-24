
import Transform from '../utils/Transform.jsx';
import Vector3 from '../utils/Vector3.jsx';

import App from '../app.jsx';

class Popin {

    $el = null;
    tpl = null;
    customClass = '';

    factor = 20;

    // debug PhysicsJS
    debug = false;

    _m = new Transform();

    constructor( el, tpl )
    {
        this.$el = $(el);

        // dynamic content
        if (tpl) this.tpl = tpl;
        // static
        else {
            setTimeout( () => {
                this.$el.find('.js-random-poly').randomPoly({
                    firstUpdate: true
                });
            }, 2000);
        }
    }

    load( url, className )
    {
        $.ajax({
            dataType: "json",
            url: url,
            success: (data) => {
                this.render(data);
            }
        });

        ga('send', 'event', 'popin', 'open', url);

        if (className) {
            this.customClass = className;
            this.$el.addClass( this.customClass );
        } else {
            this.customClass = '';
        }
    }

    render( data )
    {
        if (this.tpl != '') {
            var _tpl = Tpl[ this.tpl ]( data );
            this.$el.find('article:first').html( _tpl );
        }

        setTimeout( () => {
            this.$el.find('.js-random-poly').randomPoly({
                firstUpdate: true
            });
            this.$el.find('.js-random-btn').randomPoly({
                padding: 15,
                random: 20
            });
            this.$el.find('.js-popup').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var _this = $(this);

                var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
                var _w = _this.data('width');
                var _h = _this.data('height');

                var _l = (width - _w) * 0.5;
                var _t = (height - _h) * 0.5;

                window.open( _this.attr('href'),
                    "Flash Game",
                    "titlebar=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no, scrollbars=no, " +
                    "width=" + _w + ", height=" + _h +", " +
                    "top=" + _t + ", left=" + _l
                );
            });

        }, 150);

        this.open();
    }

    open()
    {
        this.$el.show().attr('open', true)
            .find('article:first').off( App.TRANSITION_END ).on( App.TRANSITION_END, this.onTransitionEnd.bind(this) );
        this.$el.find('h1').focus();

        this.$el.find('.js-close').off('click').on('click', (e)=> {
            e.preventDefault();
            this.close();
        });

        // need delay to enable animation on childrens
        setTimeout( () => {
            this.$el.addClass('opened');
        }, 0);
        this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));

        // use document body as Signal
        $(document.body).trigger('popin:open');

        //
        var canvas = document.getElementById('domRenderer');
        if (!canvas) return;

        canvas.width = this.$el.width();
        canvas.height = this.$el.height();

        // INIT DEBUG
        if (this.debug) {
            canvas = document.getElementById('debug');
            canvas.width = this.$el.width();
            canvas.height = this.$el.height();
        }

        var _this = this;

        Physics( function (world) {
            var bounds = Physics.aabb(0, 0, canvas.width, canvas.height);
            var renderer = Physics.renderer('dom', {
                el: 'domRenderer'
            });

            world.add( renderer );
            world.add( Physics.behavior('edge-collision-detection', {
                aabb: bounds
            }) );

            world.add( Physics.behavior('constant-acceleration') );
            world.add( Physics.behavior('body-impulse-response') );
            world.add( Physics.behavior('body-collision-detection') );
            world.add( Physics.behavior('sweep-prune') );


            Physics.util.ticker.on(function( time, dt ){
                world.step( time );
            });

            world.on('step', function () {
                world.render();

                // DEBUG
                if (_this.debug) {
                    var _bodies = world.getBodies();
                    if (_bodies.length > 1) {
                        for (var i = 0; i < _bodies.length; ++i) {
                            _this.debug(_bodies[i].geometry, _bodies[i].state.pos);
                        }
                    }
                }
            });

            Physics.util.ticker.start();

            _this.$el.find('.js-breakable').breakable({
                physics: world
            }).on('click', function() {
                var $li = $(this);
                _this.$el.find('figure ul').append( $li.detach() );
                setTimeout( function() {
                    $li.removeClass('broken');
                }, 100);
            });
        });
    }

    onMouseMove(e)
    {
        // -> -0.5 / 0.5 from center of the screen
        var _deltaX = (e.clientX - (screen.availWidth * 0.5)) / screen.availWidth;
        var _deltaY = (e.clientY - (screen.availHeight * 0.5)) / screen.availHeight;

        // apply rotation + translation
        this._m.rotation = new Vector3(_deltaY * this.factor, _deltaX * this.factor, 0);

        this.$el.find('figure').attr('style', this._m.getMatrix());
    }

    debug( geometry, center )
    {
        var canvas = document.getElementById('debug');
        //canvas.width = $(document).width();
        //canvas.height = $(document).height();

        var context = canvas.getContext( '2d' );
        context.lineWidth = 2;
        context.strokeStyle = "#0000FF";

        var vertices = geometry.vertices;

        //context.beginPath();
        var l = vertices.length;
        context.moveTo( vertices[0].x + center.x, vertices[0].y + center.y );
        for (var i=1; i<l; ++i) {
            context.lineTo( vertices[i].x + center.x, vertices[i].y + center.y );
        }
        context.lineTo( vertices[0].x + center.x, vertices[0].y + center.y );
        context.stroke();

        context.moveTo( center.x, center.y-5 );
        context.lineTo( center.x, center.y+5 );
        context.stroke();

        context.moveTo( center.x-5, center.y );
        context.lineTo( center.x+5, center.y );
        context.stroke();
    }

    close()
    {
        this.$el.removeAttr('open').removeClass('opened').removeClass( this.customClass );
        this.customClass = '';

        // use document body as Signal
        $(document.body).trigger('popin:close');
    }

    onTransitionEnd(e)
    {
        console.log( this.$el.attr('open') );

        this.$el.find('article:first').off( App.TRANSITION_END );

        // chrome || ie
        if (!this.$el.attr('open') || this.$el.attr('open')==undefined) {
            this.$el.hide();
        }
    }
}

export default Popin;