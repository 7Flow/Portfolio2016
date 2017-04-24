import Page from '../modules/Page.jsx';

import Grid3D from '../modules/Grid3D.jsx';

import Pagination from '../modules/Pagination.jsx';
import Popin from '../modules/Popin.jsx';

class Games extends Page
{
    json = 'json/games.json';
    tpl = 'app/tpl/games.html';
    $el = $('#games');

    grid3D = null;

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

        this.popin = new Popin( document.getElementById("popin"), 'app/tpl/gamePopin.html' );
    }

    initPage( $page )
    {
        this.$el.find('a[data-json]').on('click', (e)=> {
            console.log('click');
            var $this = $(e.currentTarget);
            this.popin.load( $this.data('json'), 'games' );
        });

        if (this.grid3D) this.grid3D.init( $page );
    }

    resize()
    {
        this.pagination.resize();
    }

    freeze()
    {
        if (this.grid3D) this.grid3D.freeze();
    }
    unfreeze()
    {
        if (this.grid3D) this.grid3D.unfreeze();
    }
}

export default Games;