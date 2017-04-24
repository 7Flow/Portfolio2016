/**
 * Pagination system.
 * Handle page's transition, controls & menu.
 */
class Pagination
{
    current = 0;
    num = 0;

    $current;
    $pages = [];

    $next;
    $previous;

    callback;

    // swipe minnimu distance (px)
    swipeThreshold = 70;
    // swipe max duration (ms)
    swipeMaxDuration = 300;

    _touch = {
        x: 0,
        y: 0
    };
    _swipeStart = 0;

    constructor( $el, callback )
    {
        this.$container = $el;
        this.$pages = $el.find('.page');
        this.num = this.$pages.length;

        this.$next = $el.parent().find('.controls.next');
        this.$previous = $el.parent().find('.controls.previous');

        this.$next.on('click', $.proxy(this.next, this));
        this.$previous.on('click', $.proxy(this.previous, this));

        $el.parent().find('.js-random-bg').randomPoly();

        $el.parent().find('.js-random-btn').randomPoly({
            color: '#000',
            overColor: '#FFB200',
            padding: 0,
            updateEvent: 'mouseover click'
        });

        var _this = this;
        this.$pagination = this.$container.parent().find('.pagination:first');
        this.$pagination.find('li').on('click', function() {
            _this.goTo( $(this).data('index') );
        }).find('button').on('focus', function() {
            $(this).parent().data('randomPoly').update();
        }).on('blur', function() {
            $(this).parent().data('randomPoly').reset();
        });

        this.resize();

        if (App.IS_TACTILE) {
            this.$container[0].addEventListener('touchstart', (e) => {
                var _touch = e.changedTouches[0];
                this._touch.x = _touch.pageX;
                this._touch.y = _touch.pageY;
                this._swipeStart = new Date().getTime();
            }, false);

            this.$container[0].addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, false);

            this.$container[0].addEventListener('touchend', (e) => {
                var _touch = e.changedTouches[0];
                var _dist = _touch.pageX - this._touch.x;
                var _duration = new Date().getTime() - this._swipeStart;
                if ( _duration <= this.swipeMaxDuration && Math.abs(_dist) >= this.swipeThreshold ) {
                    e.preventDefault();
                    if (_dist > 0) {
                        this.previous();
                    } else {
                        this.next();
                    }
                }
            }, false);
        }

        this.callback = callback;
        this.goTo( 0 );
    }

    next()
    {
        this.goTo( this.current+1 );
    }

    previous()
    {
        this.goTo( this.current-1 );
    }

    goTo( id )
    {
        if (id<0) return;
        if (id>=this.num) return;

        if (id == 0) this.$previous.addClass('inactive');
        else this.$previous.removeClass('inactive');

        if (id == this.num-1) this.$next.addClass('inactive');
        else this.$next.removeClass('inactive');

        if (this.$current) {
            this.$pagination.find('li.active').removeClass('active').data('randomPoly').reset();
        }

        this.current = id;
        this.$current = $(this.$pages[this.current]);
        this.$container.css('left', -this.pageWidth * this.current);

        this.$pagination.find('li:eq('+this.current+')').addClass('active').data('randomPoly').update();

        setTimeout( () => {
            this.callback( this.$current );
        }, 0);
    }

    resize()
    {
        this.pageWidth = this.$container.parent().width();

        this.$pages.width( this.pageWidth );
        this.$container.width( this.pageWidth * this.num ).css('left', -this.pageWidth * this.current);

        // find li size to calculate page dimensions
        // -> 3d transform affects render size, so, don't get dom values
        // -> img ratio 1.382
        var pageH = this.$container.height();
        var h = Math.min(250, pageH * (App.IS_TACTILE ? 0.35 : 0.4));
        var w = h * 1.382;

        var _pH = h+h+ (pageH * 0.025);
        var _pW = w+w+w+ (2*(this.pageWidth * 0.025));

        var _this = this;
        var _css = {
            'left': (this.pageWidth - _pW) * 0.5 + 'px',
            'top': (pageH - _pH) * 0.5 + 'px'
        }
        this.$pages.each( function() {
            $(this).find('ul').css(_css);
        });
    }
}

export default Pagination;