import Page from '../modules/Page.jsx';

import Grid3D from '../modules/Grid3D.jsx';

import Pagination from '../modules/Pagination.jsx';
import Popin from '../modules/Popin.jsx';

class Websites extends Page {
    json = 'json/websites.json';
    tpl = 'app/tpl/websites.html';
    $el = $('#websites');

    worldConfig = {
        // timestep
        timestep: 6,
        // maximum number of iterations per step
        maxIPF: 4,
        // default integrator
        integrator: 'verlet',
        // is sleeping disabled?
        sleepDisabled: false,
        // speed at which bodies wake up
        sleepSpeedLimit: 0.1,
        // variance in position below which bodies fall asleep
        sleepVarianceLimit: 2,
        // time (ms) before sleepy bodies fall asleep
        sleepTimeLimit: 500
    };

    processData()
    {
        var _l = this.data.length;
        var numPage = Math.ceil(_l / 6);
        var _pages = [];
        _pages[0] = [];
        var _currentPage = 0;
        for (var i = 0; i < _l; ++i) {

            if (i >= (_currentPage * 6) + 6) {
                ++_currentPage;
                _pages[ _currentPage ] = [];
            }
            _pages[_currentPage].push( this.data[i] );
        }

        var json = {
            num: numPage,
            pages: _pages
        };
        this.data = json;
    }

    init()
    {
        this.pagination = new Pagination( this.$el.find('.all-pages'), $.proxy(this.initPage, this));
        if (!App.IS_TACTILE) {
            this.grid3D = new Grid3D();
        }

        this.popin = new Popin( document.getElementById("popin"), 'app/tpl/websitePopin.html' );

        var _this = this;
    }

    initPage( $page )
    {
        this.$el.find('a[data-json]').on('click', (e)=> {
            var $this = $(e.currentTarget);
            this.popin.load( $this.data('json'), 'websites' );
        });

        if (this.grid3D) this.grid3D.init( $page );
    }

    resize()
    {

    }
}

export default Websites;