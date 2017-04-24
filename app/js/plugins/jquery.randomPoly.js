(function ( $ ) {

    /**
     * Create a polygon with a random shape around an element.
     * This shape will be updated on custom event on the element.
     * The shape take the element dimensions by default. But you can force width & height in options.
     * The element must have a position defined ('cause the svg will be in absolute).
     * If an 'overColor' is specified in options, the behavior will be a mouse over/out fx
     * You can define:
     * - random (int): number of random pixels of each point of the polygon
     * - padding (int): extra pixels added to the base dimension (element dimension or width/height option)
     * - color (hexa code): the color of the shape
     * - duration (int): The animation duration, in ms.
     * - updateEvent (string): the name of the event which will update the shape.
     *
     * @param object options Configuration options.
     */
    $.fn.randomPoly = function ( options ) {
        return this.each( function() {
            if (!$.data(this, 'randomPoly')) {
                $.data(this, 'randomPoly', new RandomPoly( this, options ));
            }
        });
    };

    /**
     * Default options
     * @type object
     * @private
     */
    var _defaults = {
        random: 10,
        padding: 5,
        duration: '200ms',
        colors: ['#ffbd66', '#b3474b'],
        firstUpdate: false,
        updateEvent: 'mouseover mouseout'
    };

    /**
     * Create an instance of RandomPoly
     * @param DOMElement el
     * @param object options
     * @constructor
     */
    function RandomPoly( el, options )
    {
        this.$el = $(el);
        this.options = $.extend({}, _defaults, options);

        if (!this.options.width) this.options.width = this.$el.width();
        if (!this.options.height) this.options.height = this.$el.height();

        this.rect = {
            x1: 0, y1: 0,
            x2: 0, y2: 0,
            x3: 0, y3: 0,
            x4: 0, y4: 0
        };

        this.createPoly();
        if (!this.options.firstUpdate) this.reset();
        else this.update();

        var _this = this;
        if (this.options.updateEvent != '') {
            this.$el.on(this.options.updateEvent, function (e) {
                e.preventDefault();
                _this.update();
            });

            if (this.options.overColors) {
                this.$el.on('mouseout', function (e) {
                    e.preventDefault();
                    _this.reset();
                });
            }
        }
    };

    RandomPoly.prototype.createPoly = function()
    {
        var el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        el.setAttributeNS(null, 'width', this.options.width + (this.options.random + this.options.padding) * 2);
        el.setAttributeNS(null, 'height', this.options.height + (this.options.random + this.options.padding) * 2);

        if (this.$el.find('*:first').length) {
            this.$el[0].insertBefore(el, this.$el.find('*:first')[0]);
        } else {
            this.$el[0].appendChild(el);
        }

        el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        el.setAttributeNS(null, "points", "0,0 0,0 0,0 0,0");
        if (this.options.colors.length > 1) {
            this.gradientId = this.$el[0].id +  '-gradient';
            el.setAttributeNS(null, 'fill', 'url(#'+this.gradientId+')');
        } else {
            el.setAttributeNS(null, 'fill', this.options.colors[0] );
        }
        this.$el.find('svg')[0].appendChild(el);

        el = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        el.setAttributeNS(null, 'attributeName', 'points');
        el.setAttributeNS(null, 'begin', 'indefinite');
        el.setAttributeNS(null, 'dur', this.options.duration);
        el.setAttributeNS(null, 'to', '0,0 0,0 0,0 0,0');
        el.setAttributeNS(null, 'fill', 'freeze');
        this.$el.find('polygon')[0].appendChild(el);

        if (this.options.colors.length > 1) {

            el = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            el.setAttributeNS(null, 'id', this.gradientId);
            el.setAttributeNS(null, 'x1', '1');
            el.setAttributeNS(null, 'x2', '0');
            el.setAttributeNS(null, 'y1', '0');
            el.setAttributeNS(null, 'y2', '1');
            var _colorStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            _colorStop.setAttributeNS(null, 'offset', '0%');
            _colorStop.setAttributeNS(null, 'stop-color', '#ffbd66');
            el.appendChild( _colorStop );
            _colorStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            _colorStop.setAttributeNS(null, 'offset', '100%');
            _colorStop.setAttributeNS(null, 'stop-color', '#b3474b');
            el.appendChild( _colorStop );
            this.$el.find('svg')[0].appendChild(el);
        }

        this.$el.find('svg').css({top: -(this.options.random + this.options.padding), left: -(this.options.random + this.options.padding)});
    };

    /**
     * Return to the 'base' shape: defined by the element, or the width/height specified in options.
     */
    RandomPoly.prototype.update = function()
    {
        var _points = '' + this.rect.x1 + ' ' + this.rect.y1 + ' ' + this.rect.x2 + ' ' + this.rect.y2 + ' ' + this.rect.x3 + ' ' + this.rect.y3 + ' ' + this.rect.x4 + ' ' + this.rect.y4;
        this.$el.find('polygon').attr('points', _points);

        if (this.options.overColors) {
            this.$el.find('polygon').attr('fill', this.options.overColors[0]);
        }

        var _margin = this.options.padding + this.options.padding + this.options.random;

        this.rect.x1 = Math.random() * this.options.random;
        this.rect.y1 = Math.random() * this.options.random;
        this.rect.x2 = this.options.width + _margin + Math.random() * this.options.random;
        this.rect.y2 = Math.random() * this.options.random;

        this.rect.x3 = this.options.width + _margin + Math.random() * this.options.random;
        this.rect.y3 = this.options.height + _margin + Math.random() * this.options.random;
        this.rect.x4 = Math.random() * this.options.random;
        this.rect.y4 = this.options.height + _margin + Math.random() * this.options.random;

        _points = '' + this.rect.x1 + ' ' + this.rect.y1 + ' ' + this.rect.x2 + ' ' + this.rect.y2 + ' ' + this.rect.x3 + ' ' + this.rect.y3 + ' ' + this.rect.x4 + ' ' + this.rect.y4;

        var _animation = this.$el.find('animate').attr('to', _points)[0];
        if (_animation.beginElement) _animation.beginElement();
        else {
            this.$el.find('polygon').attr('points', _points);
        }

        this.$el.trigger("update", [this.rect]);
    };

    RandomPoly.prototype.reset = function()
    {
        if (this.$el.hasClass('active')) return;

        var _points = '' + this.rect.x1 + ' ' + this.rect.y1 + ' ' + this.rect.x2 + ' ' + this.rect.y2 + ' ' + this.rect.x3 + ' ' + this.rect.y3 + ' ' + this.rect.x4 + ' ' + this.rect.y4;
        this.$el.find('polygon').attr('points', _points);

        if (this.options.colors.length > 1) {
            this.$el.find('polygon').attr('fill', 'url(#'+this.gradientId+')');
        } else {
            this.$el.find('polygon').attr('fill', this.options.colors[0] );
        }

        var _margin = this.options.padding + this.options.padding + this.options.random;

        this.rect.x1 = this.options.random;
        this.rect.y1 = this.options.random;
        this.rect.x2 = this.options.width + _margin;
        this.rect.y2 = this.options.random;

        this.rect.x3 = this.options.width + _margin;
        this.rect.y3 = this.options.height + _margin;
        this.rect.x4 = this.options.random;
        this.rect.y4 = this.options.height + _margin;

        _points = '' + this.rect.x1 + ' ' + this.rect.y1 + ' ' + this.rect.x2 + ' ' + this.rect.y2 + ' ' + this.rect.x3 + ' ' + this.rect.y3 + ' ' + this.rect.x4 + ' ' + this.rect.y4;

        var _animation = this.$el.find('animate').attr('to', _points)[0];
        if (_animation.beginElement) _animation.beginElement();
        else {
            this.$el.find('polygon').attr('points', _points);
        }

        this.$el.trigger("reset", [this.rect]);
    };

}( jQuery ));