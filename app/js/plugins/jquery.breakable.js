(function ( $ ) {

    $.fn.breakable = function ( options ) {
        return this.each( function() {
            if (!$.data(this, 'breakable')) {
                $.data(this, 'breakable', new Breakable( this, options ));
            }
        });
    };

    // defaults
    var _defaults = {
        content: '.js-container',
        num: 3,
        class: 'broken',
        physics: false
    };


    function Breakable( el, options ) {
        this.$el = $(el);
        this.options = $.extend({}, _defaults, options);

        var _this = this;
        this.$el.on('click', function (e) {
            e.preventDefault();
            _this.explode.call(_this, e);
        });
    };

    Breakable.prototype.explode = function(e)
    {
        // relative impact position (from top left el)
        var _impact = {x: e.offsetX, y: e.offsetY};
        this.$el.off('click');

        // break element
        var _pieces = [],
            _tpl = '',
            _rect = null,
            _corner = null,
            _w = this.$el.width(),
            _h = this.$el.height();

        // split perimeters in n length (randomly)
        var _perimeter = _w + _w + _h + _h,
            _segment = 'width',
            _segmentSize = _perimeter / this.options.num,
            _lastX = 0,
            _lastY = 0,
            _tmp = 0,
            _edge = 0,
            _bodies = [];

        // offset for rendering is:
        // impact - center
        var _offset = {
            x: this.$el.width() * 0.5,
            y: this.$el.height() * 0.5
        };

        // cutting: start from 0,0 & turn clockwise, with _edge:
        //     0
        //    ___
        // 3 |   | 1
        //    ---
        //     2
        for (var i = 0; i < this.options.num; ++i) {
            var _piece = this.$el.clone();

            _rect = {
                x1: _lastX,
                y1: _lastY
            };

            if (_segment == 'width') {
                if (_edge == 0) {
                    _tmp = _lastX + _segmentSize;
                    if (_tmp > _w) {
                        _rect.x2 = _w;
                        _rect.y2 = _tmp - _w;
                        _segment = 'height';
                        _corner = {x: _w, y: 0};
                        ++_edge;
                    } else {
                        _rect.x2 = _tmp;
                        _rect.y2 = 0;
                    }
                } else {
                    _tmp = _lastX - _segmentSize;
                    if (_tmp < 0) {
                        _rect.x2 = 0;
                        _rect.y2 = _h + _tmp;
                        _segment = 'height';
                        _corner = {x: 0, y: _h};
                        ++_edge;
                    } else {
                        _rect.x2 = _tmp;
                        _rect.y2 = _h;
                    }
                }
            } else {
                if (_edge == 1) {
                    _tmp = _lastY + _segmentSize;
                    if (_tmp > _h) {
                        _rect.y2 = _h;
                        _rect.x2 = _w - (_tmp - _h);
                        _segment = 'width';
                        _corner = {x: _w, y: _h};
                        ++_edge;
                    } else {
                        _rect.y2 = _tmp;
                        _rect.x2 = _w;
                    }
                } else {
                    _tmp = _lastY - _segmentSize;
                    // LAST SEGMENT
                    if (_tmp < 0) {
                        _rect.y2 = 0;
                        _rect.x2 = -_tmp;
                        _segment = 'width';
                        _corner = {x: 0, y: 0};
                        ++_edge;
                    } else {
                        _rect.y2 = _tmp;
                        _rect.x2 = 0;
                    }
                }
            }

            _lastX = _rect.x2;
            _lastY = _rect.y2;

            _tpl = 'polygon(' + _rect.x1 + 'px ' + _rect.y1 + 'px, ';
            if (_corner) {
                _tpl += _corner.x + 'px ' + _corner.y + 'px, ';
            }
            _tpl += _rect.x2 + 'px ' + _rect.y2 + 'px, ' + _impact.x + 'px ' + _impact.y + 'px);';

            // -> GET POLYGON CENTER
            // _vertices are top-left origin
            var _vertices = [
                {x: _rect.x1, y: _rect.y1}
            ];
            if (_corner) {
                _vertices.push({x: _corner.x, y: _corner.y});
            }
            _vertices.push({x: _rect.x2, y: _rect.y2});
            _vertices.push({x: _impact.x, y: _impact.y});

            // if not convex, limit vertices to the triangle : start - corner - impact
            // (not convex could only occurs if vertices.length > 3)
            if ( !Physics.geometry.isPolygonConvex( _vertices ) ) {

            }

            // get center
            var _center = Physics.geometry.getPolygonCentroid( _vertices );

            // make sure the poly is centered into its parent
            _piece.find( this.options.content ).attr('style', '-webkit-clip-path: ' + _tpl + ' transform: translate(-' + _center.x + 'px, -' + _center.y + 'px);');

            if (this.options.physics) {
                // no need to have the vertices position relative to a center 0,0
                // PhysicsJS will calculate the COM automatically, and center the geometry
                /*for (var j=0; j<_vertices.length; ++j) {
                    var _v = _vertices[j];
                    _v.x -= _center.x;
                    _v.y -= _center.y;
                }*/

                var _el = _piece[0];
                // PhysicsJS apply transform rotate to el
                // -> css will rotate around the center of the div by default
                // => change transform-origin to top-left or null dimensions to rotate around position instead
                _el.className = 'break-part';

                var _body = Physics.body('convex-polygon', {
                    // set the position of the polygon's center
                    x: this.$el.position().left + _center.x,
                    y: this.$el.position().top + _center.y,
                    vx: (_center.x - _impact.x) * 0.001,
                    vy: (_center.y - _impact.y) * 0.001,
                    angularVelocity: (Math.random() - 0.5) * 0.003,
                    mass: 2,
                    restitution: 0.1,
                    view: _el,
                    vertices: _vertices
                });

                _bodies.push( _body );
            } else {
                _piece.addClass('break-part');
                this.$el.parent().append( _piece )
            }
        }

        if (this.options.physics) {
            this.options.physics.add( _bodies );
        }

        this.$el.addClass( this.options.class ).trigger('broken');
    };


}( jQuery ));