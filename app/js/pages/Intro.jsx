import Page from '../modules/Page.jsx';

import Background from '../modules/Background.jsx';

class Intro extends Page
{
    tpl = 'app/tpl/intro.html';
    $el = $(document.getElementById('intro'));

    init()
    {
        var _img = new Image();
        _img.onload = () => {
            this.bg = new Background( this.$el.find('.page-background:first')[0], 1000 );
            this.resize();

            // intro
            this.$el.find('blockquote p:last').on('transitionend oTransitionEnd transitionend webkitTransitionEnd', () => {
                this.$el.find('blockquote p:last').off('transitionend oTransitionEnd transitionend webkitTransitionEnd');
                this.$el.trigger('intro:complete');
            });
            this.$el.addClass('intro');
        };
        _img.src = $( document.getElementById('img-source') ).attr('src');
    }

    resize()
    {
        this.bg.resize();
    }

    freeze()
    {
        this.bg.pause();
    }

    clear()
    {
        this.bg.destroy();
        this.bg = null;
    }
}

export default Intro;