
class Header
{
    rectActive = {
        x1: 0, y1: 0,
        x2: 0, y2: 0,
        x3: 0, y3: 0,
        x4: 0, y4: 0
    };

    rectRandomRadius = 15;

    current = "";
    validHash = [];

    intro = true;

    constructor( cb )
    {
        this.$el = $( document.getElementsByTagName('header') );
        this.$markerActive = this.$el.find('span.current');
        this.$markerOver = this.$el.find('span.over');

        this.$lis = this.$el.find('li');
        this.$lis.each( (i,el) => {
            this.validHash.push( $(el).find('a').attr('href') );
        });

        setTimeout( () => {
            // get desired section
            var _hash = window.location.hash;
            if (_hash=='' || _hash=='#intro' || this.validHash.indexOf(_hash) == -1) _hash = this.validHash[0];
            this.wanted = _hash;

            if (window.location.search != '?noIntro') {
                // play intro
                this.setHash( '#intro', true );
                // but highlight the wanted section
                this.highlight( this.$lis.find('a[href="'+ this.wanted +'"]'), false );
                // then go to the desired section
            }
        }, 150);

        this.callback = cb;

        this.$lis.on('mouseover', (e) => {
            clearTimeout( this.outTimer );
            this.highlight( $(e.currentTarget) );
        }).on('mouseout', (e) => {
            this.outTimer = setTimeout( () => {
                this.highlight( $('header li.active') );
            }, 300);
        }).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    /**
     * Callback of window.onhashchange
     * @param e
     */
    onHashChange( e )
    {
        var _hash = (e && e.newURL ? '#'+e.newURL.split('#')[1] : window.location.hash);
        if (_hash.indexOf('?')!=-1) _hash = _hash.split('?')[0];

        if (this.validHash.indexOf(_hash) == -1) {
            _hash = this.validHash[0];
            window.location.hash = _hash;
        }

        if (this.current != _hash) {
            this.select( _hash );
        }
    }
    setHash( hash, navigate )
    {
        if (this.current != hash) {
            window.location.hash = hash;
            if (navigate) this.select( hash );
        }
    }

    select( hash )
    {
        this.current = hash;
        this.$lis.removeClass('active');

        var $target;
        if (hash == "") {
            $target = this.$lis.eq(0).addClass('active');
            this.current = this.$lis.eq(0).attr('href');
        } else {
            $target = this.$lis.find('a[href="'+ hash +'"]').parent().addClass('active');
        }

        if ($target.length) this.highlight( $target, true );
        ga('send', 'pageview', this.current );
        this.callback( this.current );
    }

    highlight( $target, selected )
    {
        if (!$target || !$target.length) return;

        this.$markerOver.css( {width: $target.outerWidth(), left: $target.offset().left} );

        if (selected) {
            this.$markerActive.css( {width: $target.outerWidth(), left: $target.offset().left} );

            if (this.$bgActive) {
                this.$bgActive.css({width: $target.outerWidth() + this.rectRandomRadius * 2, left: $target.offset().left - this.rectRandomRadius});

                var _points = '' + this.rectActive.x1 + ' ' + this.rectActive.y1 + ' ' + this.rectActive.x2 + ' ' + this.rectActive.y2 + ' ' + this.rectActive.x3 + ' ' + this.rectActive.y3 + ' ' + this.rectActive.x4 + ' ' + this.rectActive.y4;
                this.$bgActive.find('polygon').attr('points', _points);

                this.rectActive.x3 = $target.outerWidth() + this.rectRandomRadius;
                this.rectActive.y3 = $target.outerHeight() + this.rectRandomRadius;
                this.rectActive.x4 = this.rectRandomRadius;
                this.rectActive.y4 = this.rectActive.y3;

                this.rectActive.x1 = Math.random() * this.rectRandomRadius;
                this.rectActive.y1 = Math.random() * this.rectRandomRadius;
                this.rectActive.x2 = $target.outerWidth() + this.rectRandomRadius + Math.random() * this.rectRandomRadius;
                this.rectActive.y2 = Math.random() * this.rectRandomRadius;

                _points = '' + this.rectActive.x1 + ' ' + this.rectActive.y1 + ' ' + this.rectActive.x2 + ' ' + this.rectActive.y2 + ' ' + this.rectActive.x3 + ' ' + this.rectActive.y3 + ' ' + this.rectActive.x4 + ' ' + this.rectActive.y4;

                var _animation = this.$bgActive.find('animate').attr('to', _points)[0];
                if (_animation.beginElement) _animation.beginElement();
                else {
                    this.$bgActive.find('polygon').attr('points', _points);
                }

                if (!App.IS_MOBILE) this.$el.find('.avatar:first').data('randomPoly').update();
            }
        }
    }

    /**
     *
     * @param $parent
     */
    createBg( $parent ) {
        var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        poly.setAttributeNS(null, "points", "0,0 0,0 0,0 0,0");
        poly.setAttributeNS(null, 'fill', '#ffb162');
        $parent.find('svg')[0].appendChild( poly );

        var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttributeNS(null, 'attributeName', 'points');
        animate.setAttributeNS(null, 'begin', 'indefinite');
        animate.setAttributeNS(null, 'dur', '240ms');
        animate.setAttributeNS(null, 'to', '0,0 0,0 0,0 0,0');
        animate.setAttributeNS(null, 'fill', 'freeze');

        //colors = ['#ffb162', '#b3474b'];

        $parent.find('polygon')[0].appendChild( animate );
    }

    resize()
    {
        var $target = $('header li.active');
        this.$markerOver.css( {width: $target.outerWidth(), left: $target.offset().left} );
        this.$markerActive.css( {width: $target.outerWidth(), left: $target.offset().left} );
        if (this.$bgActive) {
            this.$bgActive.css({width: $target.outerWidth() + this.rectRandomRadius * 2, left: $target.offset().left - this.rectRandomRadius});
        }
    }

    goBackToNineties()
    {
        this.$bgActive = this.$el.find('div.current');
        //this.$bgOver = this.$el.find('div.over');
        this.createBg( this.$bgActive );
        //this.createBg( this.$bgOver );

        if (!App.IS_MOBILE) {
            this.$name = this.$el.find('.profile:first .name');
            this.$el.find('.avatar:first').randomPoly().on('update', this.updateName.bind(this));
            this.$el.find('.avatar:first').data('randomPoly').update();
        }

        this.$lis.off('click').on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setHash( $(e.currentTarget).find('a').attr('href') );
        });
    }

    /**
     * Display the real hash
     * Used when intro is displayed before the desired page
     */
    resume()
    {
        window.onhashchange = $.proxy(this.onHashChange, this);

        window.history.pushState( {}, "", "?noIntro"+this.wanted );

        this.setHash( this.wanted, true );
    }

    /**
     * Set "name" skew, when avatar background change (over, page change)
     * @param e
     * @param rect
     */
    updateName( e, rect )
    {
        // MOVE NAMES
        // assume initial -5.5deg rotation
        var _skew = -(Math.atan2(rect.y3 - rect.y2, rect.x3 - rect.x2) * 180 / Math.PI - 90) + 5.5;
        this.$name.css('-webkit-transform', 'skewX('+_skew+'deg)').css('-ms-transform', 'skewX('+_skew+'deg)');

        // left offset
        var _offset = (rect.x2 + rect.x3) * .5 + 10;
        this.$name.css('left', _offset);
    }
}

export default Header;