
class Page {

    $el = null;
    tpl = '';
    json = '';
    data = null;
    assetPercent = 5;
    percent = 0;

    jsonPercent = 5;

    // already stored by App... need refacto
    static LOADING = $(document.getElementById('loading'));

    load()
    {
        Page.LOADING.removeClass('animate complete').attr('value', 0 );

        // if static page, go directly to loaded
        if (!this.json || this.json == '') {
            Page.LOADING.attr('value', 100 );
            this.loaded();
            return;
        }

        var _proxy = $.proxy( this.jsonLoaded, this );
        $.ajax({
            dataType: "json",
            url: this.json,
            success: _proxy
        });
    }

    jsonLoaded( data )
    {
        var _loader = new createjs.LoadQueue(false);
        _loader.on("fileload", this.udpateLoading, this);
        _loader.on("complete", this.loaded, this);
        var _manifest = [];

        this.percent += this.jsonPercent;
        this.data = data;

        var l = data.length;
        this.assetPercent = (100 - this.jsonPercent) / l;

        for (var i=0; i<l; ++i) {
            _manifest.push( {id: data[i].title, src: data[i].image} );
        }
        _loader.loadManifest( _manifest );

        Page.LOADING.attr('value', this.percent );
    }

    udpateLoading()
    {
        this.percent += this.assetPercent;
        Page.LOADING.attr('value', this.percent );
    }

    loaded()
    {
        this.percent = 100;
        Page.LOADING.attr( 'value', this.percent );

        this.render();

        setTimeout( ()=> {
            this.$el.trigger("loaded");
        }, 200);
    }

    render()
    {
        if (this.tpl != '') {
            if (this.processData) this.processData();

            var _tpl = Tpl[ this.tpl ]( this.data );
            this.$el.html( _tpl );
        }
    }

    /**
     * initialization: called when loading is complete by App.
     * @see App.sectionLoaded
     */
    init() {}

    resize() {}

    /**
     * "pause" the page.
     * Called when changing page & on popin open/close.
     * @see App.onPopinOpen
     */
    freeze() {}
    unfreeze() {}

    /**
     * Remove all resources
     * Don't destroy the page, but destroy all the resources that the page instanciate on init
     */
    clear()
    {
        this.data = null;
        this.$el.empty();
    }
};

export default Page;