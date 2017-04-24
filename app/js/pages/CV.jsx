
import Page from '../modules/Page.jsx';

import Transform from '../utils/Transform.jsx';
import Vector3 from '../utils/Vector3.jsx';

class CV extends Page {

    $el = $('#cv');
    tpl = 'app/tpl/cv.html';
    json = 'json/cv.json';

    orientation = 0;

    _m = new Transform();

    init()
    {
        this.$timeline = this.$el.find('.timeline:first');

        if (App.IS_TACTILE) {
            window.addEventListener("deviceorientation", this.onOrientation.bind(this) );
            window.addEventListener("orientationchange", this.onOrientationChage.bind(this) );
        } else {
            this.$el.on('mousemove', this.onMouseMove.bind(this) );
        }

        this.$el.on('scroll', this.onScroll.bind(this) );
        this.onScroll();
    }

    jsonLoaded( data )
    {
        this.data = data;
        $('#loading').attr('value', 100 );

        this.render();

        var _options = {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    display: false,
                    min: 0,
                    max: 100,
                    stepSize: 100
                },
                gridLines: {
                    drawTicks: false,
                    drawOnChartArea: false,
                    lineWidth: 3,
                    color: 'rgba(64,0,41, 0.4)'
                },
                pointLabels: {
                    fontFamily: "'Market Deco', serif",
                    fontSize: 20,
                    fontColor: '#b3474b'
                }
            },
            tooltips: {
                enabled: false,
                backgroundColor: 'rgba(0,0,0,0)',
                titleFontFamily: "'Market Deco', serif",
                titleFontSize: 20,
                titleFontColor: '#ffb162',
                bodyFontFamily: "'Damion', cursive",
                bodyFontSize: 16,
                bodyFontColor: '#ffe476',
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        return value+"%";
                    }
                }
            },
            element: {
                line: {
                    stepped: true
                }
            }
        };

        // create skills (WW98 style)
        this.$el.find('li.chart').each( function() {
            var id = this.id;
            var ctx = this.getElementsByTagName('canvas')[0];

            var _gradient = ctx.getContext("2d").createLinearGradient(0,0, 0, 250);
            _gradient.addColorStop(0, "rgba(147, 189, 245, 0.5)");
            _gradient.addColorStop(1, "rgba(115, 153, 115, 0.5)");

            var _yellow = 'rgba(255,228,118, 1)';
            var _orange = 'rgba(255,177,98, 1)';
            var _red = 'rgba(135,54,75, 1)';

            var _dataSet = {
                labels: [],
                datasets: [
                    {
                        label: id,
                        data: [],
                        borderColor: _orange,
                        backgroundColor: _gradient,
                        pointBackgroundColor: _orange,
                        pointBorderColor: _red,
                        pointHoverBackgroundColor: _yellow,
                        pointHoverBorderColor: _red,
                        borderWidth: 3,
                        pointRadius: 4,
                        fill: true,
                        lineTension: 0,
                        fillColor: _gradient
                    }
                ]
            };
            // preprocess data
            var _data = data.skills.domain[id];
            var _labels = [];
            for (var i=0; i<_data.length; ++i) {
                var _skill = _data[i];
                _dataSet.labels.push( _skill.name );
                _dataSet.datasets[0].data.push( _skill.level / 5 * 100 )
            }
            // build Chart
            var _skillsRadar = new Chart( ctx, {
                type: 'radar',
                data: _dataSet,
                options: _options
            });
        });

        this.$el.trigger("loaded");
    }

    resize()
    {

    }

    freeze()
    {

    }

    clear()
    {

    }

    onOrientation(e)
    {
        if (this.orientation) {
            this.rotate( -(e.beta) * 1.2, (e.gamma+90) * 0.33 );
        } else {
            // gamma: -90 front | 0 horizontal
            this.rotate( (e.gamma+90) * 0.33, -(e.beta) * 1.2 );
        }
    }
    onOrientationChage(e)
    {
        switch(window.orientation)
        {
            case -90:
            case 90:
                //landscape
                this.orientation = 0;
                break;
            default:
                //portrait
                this.orientation = 1;
                break;
        }
    }

    onMouseMove(e)
    {
        // -> -0.5 / 0.5 from center of the screen
        var _deltaX = (e.clientX - (screen.availWidth * 0.5)) / screen.availWidth;
        var _deltaY = (e.clientY - (screen.availHeight * 0.5)) / screen.availHeight;

        this.rotate( _deltaY * 10, _deltaX * 10 );
    }

    rotate( x, y )
    {
        // tilt
        this._m.rotation.x = x;
        // pan
        this._m.rotation.y = y;

        this.$timeline.attr( 'style', this._m.getMatrix() );
    }

    onScroll()
    {
        var _stop = this.$el.scrollTop();
        var _h = window.innerHeight * 0.5;

        this.$el.find('article div').each( function() {
            var $this = $(this);
            if (!$this.hasClass('visible')) {
                var _top = $this.offset().top;
                if (_top < _stop + _h) {
                    $this.addClass('visible');
                }
            }
        });
    }
}

export default CV;