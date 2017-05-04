
import Transform from '../utils/Transform.jsx';
import Vector3 from '../utils/Vector3.jsx';
import Vector2 from '../utils/Vector2.jsx';

import App from '../app.jsx';

/**
 * A grid, each panel/case will be rotated according to cursor's position
 */
class Grid3D
{
    // rotation curve
    distCurve = new Bezier(0, 0, 0.3, 0, 0.7, 1, 1, 1);
    panels = [];

    radius = 450;
    factor = 60;
    light = new Vector3(-0.3,-0.2,1);

    // use one Transform object for all panels
    _m = new Transform();

    $el;

    constructor()
    {
        this.light = this.light.normalize();
    }

    init( $page )
    {
        var _this = this;
        this.$page = $page;
        this.panels = [];

        // create all panels that will be moved in 3D
        this.$page.find('li').each(function (i) {
            var $this = $(this);

            var _panel = {
                x: 0,
                y: 0,
                $el: $this
            };
            _this.panels.push(_panel);

            if (App.IS_FIREFOX || App.IS_IE) {
                $this.find('.overlay').css('clip-path', 'url("#panel-out")');

                $this.on('mouseover', function() {
                    $this.find('.overlay').css('clip-path', 'url("#panel-over")');
                }).on('mouseout', function() {
                    $this.find('.overlay').css('clip-path', 'url("#panel-out")');
                })
            }

            // css @keyframe animation will make img crisp at the end
            // css transition too... no solution
            /*$this.find('.thumb').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
             $(this).toggleClass('over');
             });
             $this.find('.thumb').on('mouseout', function() {
             $(this).removeClass('over');
             });*/
        });
        // precompute positions
        this.resize();

        this.$el = $page.parents('section:first');
        this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));
    }

    onMouseMove(e)
    {
        for (var i = 0; i < this.panels.length; ++i) {
            var _panel = this.panels[i];

            // dist. from panel (original) center (stored after 3d transform)
            var _deltaX = (e.clientX - _panel.x) / this.radius;
            var _deltaY = (e.clientY - _panel.y) / this.radius;
            var _dist = this.distCurve.get(1 - Math.min(1, Math.sqrt(_deltaX * _deltaX + _deltaY * _deltaY))).y;

            // clamp -1;1
            _deltaX = Math.min(Math.max(-1, _deltaX), 1) * _dist;
            _deltaY = Math.min(Math.max(-1, _deltaY), 1) * _dist;

            // apply rotation + translation
            this._m.rotation = new Vector3(_deltaY * this.factor, _deltaX * this.factor, 0);
            this._m.position = new Vector3(0, 0, _dist * 50);
            var _styles = this._m.getMatrix();

            // get specular
            // var _light = new Vector3(-0.3,-0.2,1).normalize();
            var _dir = new Vector3(0,0,1).forward( this._m );
            var _dot = this.light.dot( _dir );
            _dot = _dot * _dot * _dot * _dot;

            // ! WARNING !
            // css3 filter (filter, text-shadow, etc...) flatten 3d
            // element will be flatten into its parent
            // ->don't apply img filter on li
            _panel.$el.attr('style', _styles).find('img:first').css('-webkit-filter', 'brightness('+(0.3 + (_dot * _dot))+')');
        }
    }

    freeze()
    {
        this.$el.off('mousemove');
    }
    unfreeze()
    {
        this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));
    }

    resize()
    {
        var $parent = this.$page.find('ul');
        var _top = $parent.position().top;
        var _left = $parent.position().left;

        for (var i = 0; i < this.panels.length; ++i) {
            var _panel = this.panels[i];
            var $this = _panel.$el;

            _panel.x = $this.position().left + _left + $this.width() * 0.5;
            _panel.y = $this.position().top + _top + $this.height() * 0.5;
        }
    }

    destroy()
    {
        this.$el.off('mousemove');
        this.$el.find('li').each(function (i) {
            $(this).off('mouseover mouseout click');
        });
    }
}

export default Grid3D;