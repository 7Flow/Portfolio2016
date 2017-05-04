
import Popin from '../modules/Popin.js';

class Footer
{
    constructor()
    {
        this.$el = $( document.getElementsByTagName('footer') );
    }

    goBackToNineties()
    {
        this.$el.find('li > a').randomPoly({
            random: 20,
            colors: ['#400029'],
            overColors: ['#ffb162'],
            padding: 0,
            width: 22,
            height: 22
        });

        this.popin = new Popin( document.getElementById("credits") );
        this.$el.find('a:first').on( 'click', this.popin.open.bind(this.popin) );
    }
}

export default Footer;