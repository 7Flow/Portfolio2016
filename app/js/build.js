(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Footer = require('./modules/Footer.jsx');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./modules/Header.jsx');

var _Header2 = _interopRequireDefault(_Header);

var _About = require('./pages/About.jsx');

var _About2 = _interopRequireDefault(_About);

var _Games = require('./pages/Games.jsx');

var _Games2 = _interopRequireDefault(_Games);

var _Websites = require('./pages/Websites.jsx');

var _Websites2 = _interopRequireDefault(_Websites);

var _CV = require('./pages/CV.jsx');

var _CV2 = _interopRequireDefault(_CV);

var _Intro = require('./pages/Intro.jsx');

var _Intro2 = _interopRequireDefault(_Intro);

var _jqueryRandomPoly = require('./plugins/jquery.randomPoly.js');

var _jqueryRandomPoly2 = _interopRequireDefault(_jqueryRandomPoly);

var _jqueryBreakable = require('./plugins/jquery.breakable.js');

var _jqueryBreakable2 = _interopRequireDefault(_jqueryBreakable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        var _this = this;

        _classCallCheck(this, App);

        this.current = '';
        this.currentPage = null;
        this.$currentSection = null;
        this.previous = '';
        this.previousPage = null;
        this.$previousSection = null;
        this.$loading = null;
        this.pages = {
            Intro: _Intro2.default,
            About: _About2.default,
            Games: _Games2.default,
            Websites: _Websites2.default,
            CV: _CV2.default
        };

        this.header = new _Header2.default($.proxy(this.loadSection, this));
        this.footer = new _Footer2.default();

        this.$loading = $(document.getElementById('loading'));

        $(document.getElementsByTagName('section')).on('loaded', $.proxy(this.sectionLoaded, this));

        $(document.body).addClass('loaded');

        $(window).resize(function () {
            _this.currentPage.resize();
            _this.header.resize();
        });

        $(document.body).on('popin:open', $.proxy(this.onPopinOpen, this)).on('popin:close', $.proxy(this.onPopinClose, this));

        if (window.location.search != '?noIntro') {
            // wait for intro to finish (intro is in #about)
            $(document.getElementById('intro')).on('intro:complete', this.goBackToNineties.bind(this));
        } else {
            this.intoTheNineties();
        }

        var _name = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(_name) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(_name.substr(0, 4))) {
            App.IS_TACTILE = true;
            if (window.innerWidth <= 480) App.IS_MOBILE = true;
            $('html').addClass('touch');
        }
        App.IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        App.IS_IE = navigator.appVersion.indexOf('Trident/') > -1;

        App.IS_SAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (App.IS_SAFARI) {
            $('html').addClass('safari');
        }
        $(document.getElementsByTagName('dialog')).hide();

        // Features detection:
        // - background-clip text (not ie edge)
        // - background-blend-mode (not ff, ie)
        var _testEl = $('#site-name')[0];
        if (!$('html').hasClass('backgroundcliptext')) $('html').addClass('no-clip-text');
        if (_testEl.style.backgroundBlendMode == undefined) $('html').addClass('no-bg-blend-mode');
    }

    /**
     * Load the section corresponding to the hash
     * Prepare loading animation, and let the page handle progress
     * On complete, the section element trigger a 'loaded' event
     * @param string id
     */


    // references all page classes


    _createClass(App, [{
        key: 'loadSection',
        value: function loadSection(hash) {
            if (this.current != '') {
                this.previous = this.current;
                this.previousPage = this.currentPage;
                this.previousPage.freeze();
            }
            // remove # from hash (substr fastest than replace)
            this.current = hash.substr(1);
            if (this.$currentSection) this.$previousSection = this.$currentSection;
            this.$currentSection = $(hash).removeClass('previous');

            this.$loading.addClass('animate');

            // create the page
            this.currentPage = new this.pages[this.$currentSection.data('page')]();
            this.currentPage.load();
        }

        /**
         * Complete animation: makes current section appears.
         * Then, init the current section.
         */

    }, {
        key: 'sectionLoaded',
        value: function sectionLoaded() {
            var _this2 = this;

            if (this.$previousSection) {
                this.$previousSection.addClass('previous').removeClass('active');

                // remove previous section
                this.$currentSection.on(App.TRANSITION_END, function () {
                    _this2.$previousSection.removeClass('previous current');
                    _this2.$currentSection.off(App.TRANSITION_END);
                    _this2.$previousSection = null;

                    _this2.previousPage.clear();
                    _this2.previousPage = null;
                });
            }
            // prepare animation: set section visible
            this.$currentSection.addClass('current');
            // set transition
            setTimeout(function () {
                _this2.$currentSection.addClass('active');
                _this2.$loading.removeClass('animate').addClass('complete');
                _this2.currentPage.init();
            }, 20);
        }

        /**
         * Change website theme, to something more... colorful :)
         */

    }, {
        key: 'goBackToNineties',
        value: function goBackToNineties() {
            var _this3 = this;

            $(document.getElementById('intro')).off('intro:complete');
            // prepare the transition
            $(document.documentElement).addClass('to-nineties');

            // wait 1s to start 90's transition
            setTimeout(function () {
                _this3.intoTheNineties();
            }, 1000);
        }
    }, {
        key: 'intoTheNineties',
        value: function intoTheNineties() {
            var _this4 = this;

            $(document.documentElement).addClass('nineties');

            setTimeout(function () {
                _this4.header.goBackToNineties();
                _this4.footer.goBackToNineties();
            }, 100);

            setTimeout(function () {
                _this4.header.resume();
            }, 1000);
        }
    }, {
        key: 'onPopinOpen',
        value: function onPopinOpen() {
            if (this.currentPage) this.currentPage.freeze();
        }
    }, {
        key: 'onPopinClose',
        value: function onPopinClose() {
            if (this.currentPage) this.currentPage.unfreeze();
        }
    }]);

    return App;
}();

App.TRANSITION_END = 'transitionend oTransitionEnd webkitTransitionEnd';
App.IS_MOBILE = false;
App.IS_TACTILE = false;
App.IS_FIREFOX = false;
App.IS_IE = false;
App.IS_SAFARI = false;
exports.default = App;


new App();
window.App = App;

},{"./modules/Footer.jsx":3,"./modules/Header.jsx":8,"./pages/About.jsx":12,"./pages/CV.jsx":13,"./pages/Games.jsx":14,"./pages/Intro.jsx":15,"./pages/Websites.jsx":16,"./plugins/jquery.breakable.js":17,"./plugins/jquery.randomPoly.js":18}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle = require('../utils/Particle.jsx');

var _Particle2 = _interopRequireDefault(_Particle);

var _ParticleTrail = require('../utils/ParticleTrail.jsx');

var _ParticleTrail2 = _interopRequireDefault(_ParticleTrail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var Background = function () {
    function Background(el, num) {
        _classCallCheck(this, Background);

        this.t = 0;
        this.num = 100;
        this.collected = 0;
        this.mx = 0;
        this.my = 0;
        this.mm = 100;
        this.particles = [];
        this.w = 0;
        this.h = 0;
        this.frame = 0;
        this.paused = false;
        this.destroying = false;

        this.num = num;
        // create canvas
        this.$el = $(el);
        this.canvas = document.createElement('canvas');
        //this.canvas.setAttribute('id', 'target');
        this.context = this.canvas.getContext('2d');

        el.appendChild(this.canvas);

        this.init();
    }

    /** BACKGROUND
     *
     *
     */


    _createClass(Background, [{
        key: 'init',
        value: function init() {
            // init black hole position
            this.blackHole = new _Particle2.default(300, 20, 0, 0, 'rgba(0,0,0,1)');
            this.resize();

            // create particles
            // position on blackhole "surface"
            for (var i = 0; i < this.num; ++i) {
                this.particles[i] = new _ParticleTrail2.default(1 + Math.random() * 3, 2.5, this.blackHole.x, this.blackHole.y, 'rgba(105,205,255,0.7)');
            }

            /*this.dispFilter = document.querySelector("feImage");
            this.toBase64( "images/nmap.jpg", (data) => {
                this.dispFilter.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", data);
            });*/

            this.source = $("#source")[0];
            this.map = $("#map")[0];

            this.createSource();
            this.createMap();

            if (window.Uint8ClampedArray) {
                this.filter = new filters.DisplacementMap(this.source, this.map, this.canvas, new filters.Point(), 100, 100, filters.ColorChannel.RED, filters.ColorChannel.GREEN);
            }

            this.t = 0.8;
            this.moveBlackHole();

            this.renderProxy = $.proxy(this.render, this);
            requestAnimationFrame(this.renderProxy);
            this.bigBang();
        }
    }, {
        key: 'createSource',
        value: function createSource() {
            var context = this.source.getContext("2d");
            var imageSource = $("#img-source")[0];
            context.drawImage(imageSource, 0, 0, imageSource.width, imageSource.height);
        }
    }, {
        key: 'createMap',
        value: function createMap() {
            var context = this.map.getContext("2d");
            var imageMap = $("#img-map")[0];
            context.drawImage(imageMap, 0, 0, imageMap.width, imageMap.height);
        }
    }, {
        key: 'moveBlackHole',
        value: function moveBlackHole() {
            var mx = this.w * 0.5 + Math.cos(this.t * 2.1) * Math.cos(this.t * 0.9) * this.w * 0.45;
            var my = this.h * 0.5 + Math.sin(this.t * 3.2) * Math.tan(Math.sin(this.t * 0.8)) * this.h * 0.3;
            this.blackHole.position(mx, my);

            if (this.filter) {
                this.filter.point.x = mx - 85;
                this.filter.point.y = my - 85;

                if (this.frame % 2 == 0) this.filter.draw();
            } else {
                this.context.globalCompositeOperation = "source-over";
                this.context.drawImage(document.getElementById('img-source'), 0, 0);
                this.context.globalCompositeOperation = "overlay";
                this.blackHole.render(this.context);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // render each 2 frames
            if (this.tog = !this.tog) {
                this.moveBlackHole();

                var n;

                // increment time
                var _delta = 0.003;
                this.t += _delta;

                this.context.globalCompositeOperation = 'lighten';

                // move particles
                if (this.collected >= this.num) {
                    this.bigBang();
                } else {
                    for (var i = 0; i < this.num; ++i) {
                        var p = this.particles[i];
                        if (p.alive) {
                            p.move();
                            var _contact = p.applyGravity(this.blackHole, 4);
                            p.render(this.context);

                            if (_contact) {
                                ++this.collected;
                            } else {
                                // rebounds
                                if (p.x < 0) p.speed.x = -p.speed.x;
                                if (p.y < 0) p.speed.y = -p.speed.y;

                                if (p.x > this.w) p.speed.x = -p.speed.x;
                                if (p.y > this.h) p.speed.y = -p.speed.y;
                            }
                        }
                    }
                }
                ++this.frame;
            }

            if (!this.paused) {
                requestAnimationFrame(this.renderProxy);
            } else if (this.destroying) {
                this.doDestroy();
            }
        }
    }, {
        key: 'bigBang',
        value: function bigBang() {
            this.collected = 0;
            var _radius = this.blackHole.radius + 2;

            for (var i = 0; i < this.num; ++i) {
                var p = this.particles[i];
                // random position on surface
                var _a = Math.random() * Math.PI * 2;
                p.position(this.blackHole.x + Math.cos(_a) * _radius, this.blackHole.y + Math.sin(_a) * _radius);
                // initial velocity
                p.randomImpulse(18, 24, this.blackHole);
            }
        }
    }, {
        key: 'toBase64',
        value: function toBase64(url, callback) {
            var img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function () {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);

                var dataURL = canvas.toDataURL("image/png");
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.w = 1800;
            this.h = 1164;
            this.canvas.width = this.w;
            this.canvas.height = this.h;

            this.blackHole.position(this.w * 0.5, this.h * 0.5);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.paused = true;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.paused) {
                this.doDestroy();
            } else {
                this.destroying = true;
            }
        }
    }, {
        key: 'doDestroy',
        value: function doDestroy() {
            this.canvas = this.context = this.blackHole = this.filter = null;
            this.$el.remove();
            this.$el = null;
        }
    }]);

    return Background;
}();

exports.default = Background;

},{"../utils/Particle.jsx":19,"../utils/ParticleTrail.jsx":20}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Popin = require('../modules/Popin.jsx');

var _Popin2 = _interopRequireDefault(_Popin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Footer = function () {
    function Footer() {
        _classCallCheck(this, Footer);

        this.$el = $(document.getElementsByTagName('footer'));
    }

    _createClass(Footer, [{
        key: 'goBackToNineties',
        value: function goBackToNineties() {
            this.$el.find('li > a').randomPoly({
                random: 20,
                colors: ['#400029'],
                overColors: ['#ffb162'],
                padding: 0,
                width: 22,
                height: 22
            });

            this.popin = new _Popin2.default(document.getElementById("credits"));
            this.$el.find('a:first').on('click', this.popin.open.bind(this.popin));
        }
    }]);

    return Footer;
}();

exports.default = Footer;

},{"../modules/Popin.jsx":11}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var GUI = function GUI(game) {
    this.game = game;

    // top-left player status
    // - create hearts
    var _x = 30;

    this.hearts = [];
    for (var i = 0; i < 3; ++i) {
        this.hearts.push(game.groups.gui.create(_x, 50, 'gui', 'heart.png'));
        _x += 30;
    }

    // game info
    this.infosWindow = new Modal(game, (game.width - 350) * 0.5, 50, 350, 100);

    // pause layer
    this.pauseLayer = new Layer(game);
    this.pauseLayer.text("PAUSE", 20);

    game.groups.gui.fixedToCamera = true;
};

GUI.prototype = {

    hearts: [],

    infosWindow: null,
    pauseLayer: null,

    lostLife: function lostLife(index) {
        this.hearts[index].frameName = 'heart-loss.png';
    },

    /**
     * Handle the equipment
     * @param data
     */
    equip: function equip(data) {
        if (!this.weapon) {
            var _y = this.game.height - 30;
            this.weapon = this.game.groups.gui.create(30, _y - 10, 'gui', 'barrel-6.png');
            this.weapon.anchor.setTo(0, 1);

            var _p = 'barrel-';
            var _pR = 'barrel-roll-';
            var _s = '.png';
            var i, j;

            // can reload even if mag is not empty
            // create all reload case animation
            for (i = 0; i < 6; ++i) {
                // from i to j animation
                for (j = i + 1; j < 7; ++j) {
                    var _frames = [_p + i + _s, _p + i + _s, _p + i + _s];
                    for (var k = i; k <= j; ++k) {
                        _frames.push(_p + k + _s);
                    }
                    this.weapon.animations.add('reload-' + i + '-' + j, _frames, 6, false);
                }
            }

            // create all fire animations
            for (i = 0; i < 6; ++i) {
                this.weapon.animations.add('attack-' + i, [_pR + i + _s, _p + i + _s], 10, false);
            }

            this.mag = this.createText(70, _y, data.current, 30);
            this.createText(100, _y, '/', 20);
            this.ammos = this.createText(118, _y, data.ammos, 14);
        } else {
            this.mag.text = data.current;
            this.ammos.text = data.ammos;
        }
    },

    /**
     * Fire the current weapon
     * @param num: ammos remaining in the mag
     */
    action: function action(num) {
        this.mag.text = num;
        this.weapon.animations.play('attack-' + num);
    },

    /**
     * Reload the current weapon
     * @param num: the num of ammo in the mag
     * @param total: the tot
     */
    reload: function reload(from, to, remain) {
        this.weapon.animations.play('reload-' + from + '-' + to);
        this.to = to;
        this.remain = remain;

        this.waiting = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.reloading, this);
    },
    reloading: function reloading() {
        this.mag.text = this.to;
        this.ammos.text = this.remain;
    },

    togglePause: function togglePause() {
        if (this.game.paused) {
            this.pauseLayer.hide();
        } else {
            this.pauseLayer.show();
        }
    },

    showInfos: function showInfos(text, duration) {
        this.infosWindow.text(text, 16);
        this.infosWindow.show(duration);
    },

    createText: function createText(x, y, text, size) {
        var _txt = this.game.add.text(x, y, text, null, this.game.groups.gui);
        _txt.anchor.setTo(0, 1);
        _txt.font = 'press_start_2pregular';
        _txt.fontSize = size;

        //  gradient
        var grd = _txt.context.createLinearGradient(0, 0, 0, _txt.canvas.height);
        grd.addColorStop(0, '#FFB200');
        grd.addColorStop(1, '#B51F22');
        _txt.fill = grd;

        // outline
        _txt.align = 'left';
        _txt.stroke = '#000000';
        _txt.strokeThickness = 4;
        //_txt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        return _txt;
    },

    destroy: function destroy() {
        this.weapon = null;
        this.hearts = [];
    }

};

exports.default = GUI;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var menuGame = function menuGame(game) {
    this.game = game;
};

menuGame.prototype = {

    game: null,

    buttons: [],
    current: 0,
    length: 0,

    currentMenu: null,

    returnBtn: null,

    // Phaser.Game.State interface
    preload: function preload() {
        var _tex;
        for (var id in this.data.textures.menu) {
            _tex = this.data.textures.menu[id];

            switch (_tex.type) {
                case "atlas":
                    this.game.load.atlas(id, _tex.path, _tex.json, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
                    break;
                case "spritesheet":
                    this.game.load.spritesheet(id, _tex.path, _tex.width, _tex.height);
                    break;
                default:
                    this.game.load.image(id, _tex.path);
                    break;
            }
        }
    },

    // Phaser.Game.State interface
    create: function create() {
        this.game.stage.backgroundColor = '#36688B';
        // 8bit pixel style
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.cursors = this.game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP,
            'down': Phaser.KeyCode.DOWN,
            'enter': Phaser.KeyCode.ENTER
        });

        this.cursors.enter.onUp.add(this.select, this);
        this.cursors.up.onUp.add(this.previous, this);
        this.cursors.down.onUp.add(this.next, this);

        // LOGO
        this.logo = this.game.add.group();
        this.bg = new Phaser.Sprite(this.game, 0, -500, "menu", "couch.png");
        this.bg.anchor.set(0.5, 1);
        this.floux = new Phaser.Sprite(this.game, 0, -500, "menu", "floux.png");
        this.floux.anchor.set(0.5, 1);
        this.logo.add(this.bg);
        this.logo.add(this.floux);

        this.super = new Phaser.Sprite(this.game, -40, -500, "menu", "super.png");
        this.new = new Phaser.Sprite(this.game, -70, -88, "menu", "new.png");
        this.new.anchor.set(0.5, 0.5);
        this.new.scale.setTo(2, 2);
        this.two = new Phaser.Sprite(this.game, 552, -88, "menu", "deux.png");
        this.new.alpha = this.two.alpha = 0;

        this.logo.add(this.two);
        this.logo.add(this.super);
        this.logo.add(this.new);

        this.game.add.tween(this.bg).to({ y: 0 }, 1000, Phaser.Easing.Back.Out, true, 250);
        this.game.add.tween(this.floux).to({ y: -10 }, 600, Phaser.Easing.Back.Out, true, 850);

        this.game.add.tween(this.super).to({ y: -102 }, 600, Phaser.Easing.Cubic.In, true, 1850);

        this.game.add.tween(this.new).to({ alpha: 1 }, 400, Phaser.Easing.Cubic.Out, true, 2700);
        this.game.add.tween(this.new.scale).to({ x: 1, y: 1 }, 600, Phaser.Easing.Back.Out, true, 2700);

        this.game.add.tween(this.two).to({ alpha: 1, x: 48 }, 400, Phaser.Easing.Cubic.In, true, 3350);

        // MAIN MENU
        this.buttons = [];
        this.mainMenu = this.game.add.group();
        var _start = new Button(this.game, -128, 0, 256, 64, "JOUER", 0);
        this.buttons.push(_start);
        this.mainMenu.add(_start);

        var _controls = new Button(this.game, -128, 60, 256, 64, "CONTROLES", 1);
        this.buttons.push(_controls);
        this.mainMenu.add(_controls);

        var _help = new Button(this.game, -128, 120, 256, 64, "AIDE", 2);
        this.buttons.push(_help);
        this.mainMenu.add(_help);

        this.length = this.buttons.length;
        this.buttons[this.current].over();

        this.returnBtn = new Button(this.game, -128, 120, 256, 64, "RETOUR", 3);

        // CONTROLS MAP
        var _style = {
            font: 'press_start_2pregular',
            fontSize: 12,
            align: 'left',
            stroke: '#000000',
            fill: '#ffffff',
            strokeThickness: 4
        };

        this.ctrlMap = this.game.add.group();
        var _key = new Phaser.Sprite(this.game, -202, 0, "menu", "key-left.png");
        this.ctrlMap.add(_key);
        _key = new Phaser.Sprite(this.game, -165, 0, "menu", "key-up.png");
        this.ctrlMap.add(_key);
        _key = new Phaser.Sprite(this.game, -128, 0, "menu", "key-right.png");
        this.ctrlMap.add(_key);

        _key = new Phaser.Sprite(this.game, -193, 47, "menu", "key-space.png");
        this.ctrlMap.add(_key);

        _key = new Phaser.Sprite(this.game, -136, 94, "menu", "key-ctrl.png");
        this.ctrlMap.add(_key);

        var _txt = new Phaser.Text(this.game, -74, 6, "gauche / sauter / droite", _style);
        this.ctrlMap.add(_txt);
        _txt = new Phaser.Text(this.game, -74, 53, "action & attaquer", _style);
        this.ctrlMap.add(_txt);
        _txt = new Phaser.Text(this.game, -74, 100, "recharger", _style);
        this.ctrlMap.add(_txt);

        this.ctrlMap.visible = false;

        // TUTORIAL
        this.help = this.game.add.group();
        this.help.visible = false;

        this.currentMenu = this.mainMenu;

        // enable mouse only on main menu
        _start.onInputDown.add(this.onDown, this);
        _controls.onInputDown.add(this.onDown, this);
        _help.onInputDown.add(this.onDown, this);
        this.returnBtn.onInputDown.add(this.onDown, this);

        _start.onInputOver.add(this.onOver, this);
        _controls.onInputOver.add(this.onOver, this);
        _help.onInputOver.add(this.onOver, this);
        this.returnBtn.onInputOver.add(this.onOver, this);

        this.returnBtn.input.enabled = false;

        setTimeout(function () {
            $('#about').trigger('state:created');
        }, 250);
    },

    /**
     * Keyboard controls
     */
    next: function next() {
        if (this.current > -1) this.buttons[this.current].out();
        ++this.current;
        if (this.current > this.length - 1) this.current = 0;
        this.buttons[this.current].over();
    },

    previous: function previous() {
        if (this.current > -1) this.buttons[this.current].out();
        --this.current;
        if (this.current < 0) this.current = this.length - 1;
        this.buttons[this.current].over();
    },

    // Phaser.Game.State interface
    update: function update() {},

    /**
     * Mouse controls
     */
    onOver: function onOver(e) {
        if (this.current > -1) {
            if (this.current !== e.data.id) this.buttons[this.current].out();else return;
        }

        if (e.data.id > -1 && e.data.id < this.buttons.length) {
            this.current = e.data.id;
            this.buttons[this.current].over();
        } else {
            this.returnBtn.over();
        }
    },

    onDown: function onDown(e) {
        console.log("#onDown: " + e.data.id);
        switch (e.data.id) {
            case 0:
                this.game.state.start("Play");
                break;
            case 1:
                this.showGroup(this.ctrlMap);
                break;
            case 2:
                this.showGroup(this.help);
                break;
            case 3:
                this.returnToMainMenu();
                break;
        }
    },

    select: function select() {
        if (this.currentMenu == this.mainMenu) {
            switch (this.current) {
                case 0:
                    this.game.state.start("Play");
                    break;
                case 1:
                    this.showGroup(this.ctrlMap);
                    break;
                case 2:
                    this.showGroup(this.help);
                    break;
            }
        } else {
            this.returnToMainMenu();
        }
    },

    showGroup: function showGroup(group) {
        this.currentMenu.visible = false;

        this.currentMenu = group;
        this.currentMenu.add(this.returnBtn);
        this.currentMenu.visible = true;

        this.returnBtn.over();

        this.buttons[0].input.enabled = this.buttons[1].input.enabled = this.buttons[2].input.enabled = false;
        this.returnBtn.input.enabled = true;
    },

    returnToMainMenu: function returnToMainMenu() {
        this.returnBtn.out();
        if (this.current > -1) this.buttons[this.current].out();

        this.currentMenu.visible = false;
        this.currentMenu = this.mainMenu;
        this.currentMenu.visible = true;

        this.current = 0;
        this.buttons[this.current].over();

        this.buttons[0].input.enabled = this.buttons[1].input.enabled = this.buttons[2].input.enabled = true;
        this.returnBtn.input.enabled = false;
    },

    resize: function resize() {
        this.game.width = this.game.world.width = $('#about').width();
        this.game.height = this.game.stage.height = this.game.world.height = $('#about').height();

        var _centerX = this.game.width * 0.5;
        this.logo.x = this.ctrlMap.x = this.help.x = this.mainMenu.x = _centerX;

        var _contentH = 236 + this.mainMenu.height;
        var _margin = (window.Game.height - _contentH) * 0.25;
        this.logo.y = _margin + 236;

        this.ctrlMap.y = this.help.y = this.mainMenu.y = this.logo.y + _margin;
    },

    // Phaser.Game.State interface
    destroy: function destroy() {
        this.cache.destroy();
        //this.game.cache = new Phaser.Cache( this.game );
        this.game.load.reset();
        this.game.load.removeAll();
        this.game = null;
    }
};

exports.default = menuGame;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GUI = require("../modules/GUI.js");

var _GUI2 = _interopRequireDefault(_GUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playGame = function playGame(game) {
    this.game = game;
};

playGame.prototype = {

    game: null,
    timer: null,
    groups: {},

    ammosGroups: [],
    ammosGroupsLength: 0,
    bulletsGroups: [],
    bulletsGroupsLength: 0,

    data: {},

    camera: null,

    isFreezed: false,

    // Phaser.Game.State interface
    preload: function preload() {
        var _tex;
        for (var id in this.data.textures.play) {
            _tex = this.data.textures.play[id];

            switch (_tex.type) {
                case "atlas":
                    this.game.load.atlas(id, _tex.path, _tex.json, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
                    break;
                case "spritesheet":
                    this.game.load.spritesheet(id, _tex.path, _tex.width, _tex.height);
                    break;
                default:
                    this.game.load.image(id, _tex.path);
                    break;
            }
        }
    },

    // Phaser.Game.State interface
    create: function create() {
        this.groups = {};
        this.isFreezed = false;

        Math.toRad = Math.PI / 180;
        Math.toDeg = 180 / Math.PI;

        var _w = this.game.stage.width;
        var _h = this.game.stage.height;

        // make data accessible
        this.game.data = this.data;

        this.game.stage.backgroundColor = '#e0e4f1';
        this.backdrop = new Backdrop(this.game);
        this.backdrop.setBackground([{ point: 0, color: "#6699cc" }, { point: 0.6, color: "#99ccff" }, { point: 0.8, color: "#ccffff" }, { point: 1, color: "#ffffcc" }]);
        this.groups.backdrop = this.backdrop;

        // 8bit pixel style
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        // Custom Camera
        this.camera = new SideCamera(this.game, 1, 0, 0, _w, _h);
        this.camera.bounds.height = this.data.world.height * this.data.tileSize;
        this.camera.bounds.width = this.data.world.width * this.data.tileSize;
        this.camera.lookBounds.offsetX = -_w * 0.5;
        this.camera.boot();

        this.game.world.setBounds(0, 0, this.world.width * this.data.tileSize, this.data.world.height * this.data.tileSize);

        // only AABB collisions (no need to be very accurate w/ player, and world is square tiled)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.data.gravity;

        this.game.groups = this.groups;
        this.game.findInGroup = this.findInGroup;

        this.backdrop.cameraOffset.y = -(this.data.world.height * this.data.tileSize - this.game.height);

        var i, j, _gL, _data;

        // create map element
        // - position (x,y), from bottom-left origin
        // - repeat (num of times repeated on x-axis)
        // - texture: id & tile width
        _gL = this.data.backdrops.length;
        for (i = 0; i < _gL; ++i) {
            _data = this.data.backdrops[i];
            var _l = _data.repeat ? _data.repeat / _data.texture.width : 1;
            var _pos = _data.x;
            // assume a top-left anchor (custom type have to deal with that)
            // and tilemap is 0-based
            var _group = this.getGroup(_data.group, false);
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;
            for (j = 0; j < _l; ++j) {
                var _tile = this.createSprite(_data, _group, _pos * this.data.tileSize, _y);
                _pos += _data.texture.width;
            }
        }

        // statics element: immovable, but active body, so player can move on
        _gL = this.data.statics.length;
        for (i = 0; i < _gL; ++i) {
            _data = this.data.statics[i];

            var _l = _data.repeat / _data.texture.width;
            var _pos = _data.x;
            // assume a top-left anchor (custom type have to deal with that)
            // and tilemap is 0-based
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;

            var _group = this.getGroup(_data.group, true);

            for (j = 0; j < _l; ++j) {
                var _tile = this.createSprite(_data, _group, _pos * this.data.tileSize, _y);
                if (_data.data && _data.data.type == "platform") {
                    _tile.body.checkCollision.left = _tile.body.checkCollision.down = _tile.body.checkCollision.right = false;
                }
                _pos += _data.texture.width;
            }
        }

        // dynamics element: active body
        _gL = this.data.dynamics.length;
        for (i = 0; i < _gL; ++i) {
            _data = this.data.dynamics[i];

            var _l = _data.repeat / _data.texture.width;
            var _pos = _data.x;
            var _y = (this.data.world.height - _data.y - 1) * this.data.tileSize;

            var _group = this.getGroup(_data.group, true);

            for (var j = 0; j < _l; ++j) {
                var _tile = this.createSprite(_data, _group, _pos * this.data.tileSize, _y);
                _pos += _data.texture.width;
            }
        }

        // adding the hero
        this.player = new Player(this.game, 2 * this.data.tileSize, (this.data.world.height - 1) * this.data.tileSize, this.data.player);
        this.game.player = this.player;
        // don't use target property
        this.camera.lookTarget.object = this.player;

        //this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors = this.game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP,
            'down': Phaser.KeyCode.DOWN,
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'action': Phaser.KeyCode.SPACEBAR,
            'reload': Phaser.KeyCode.CONTROL,
            'pause': Phaser.KeyCode.P
        });

        // gui
        this.getGroup('gui', false);
        this.game.gui = new _GUI2.default(this.game);

        this.cursors.pause.onUp.add(this.game.gui.togglePause, this.game.gui);

        $('#about').trigger('state:created');
    },

    getGroup: function getGroup(groupName, physics) {
        if (!this.groups[groupName]) {
            var _group = this.game.add.group();
            if (physics) _group.enableBody = true;
            this.groups[groupName] = _group;
            return _group;
        } else {
            return this.groups[groupName];
        }
    },

    getAmmoGroup: function getAmmoGroup(name, type) {
        var _group = this.game.add.group();
        _group.enableBody = true;
        _group.physicsBodyType = Phaser.Physics.ARCADE;

        if (type == 'bullet') {
            this.bulletsGroups.push(_group);
            ++this.bulletsGroupsLength;
        } else {
            this.ammosGroups.push(_group);
            ++this.ammosGroupsLength;
        }
        return _group;
    },

    createSprite: function createSprite(data, group, x, y) {
        var _tile;

        if (data.ctor) {
            _tile = new window[data.ctor](this.game, x, y, data);
            group.add(_tile);
        } else {
            if (data.texture.atlas) {
                _tile = group.create(x, y, data.texture.atlas, data.texture.id);
            } else {
                _tile = group.create(x, y, data.texture.id);
            }

            if (_tile.body) {
                _tile.body.immovable = true;
                _tile.body.allowGravity = false;
            }
        }

        _tile.smoothed = false;

        if (data.name) _tile.name = data.name;
        if (data.data) {
            _tile.data = Object.assign({}, data.data);
            if (data.data.type == "destructible") {
                _tile.data.life = this.data.materials[data.data.material].life;
            }
        }
        return _tile;
    },

    findInGroup: function findInGroup(groupName, name) {
        var _first, _current;
        var _group = this.groups[groupName];
        _first = _group.cursor;
        if (_first.name == name) return _first;
        // next iterator will loop through children
        // and loop to first when reaching end
        _current = _group.next();
        while (_current != _first) {
            if (_current.name == name) return _current;
            _current = _group.next();
        }
        return null;
    },

    // Phaser.Game.State interface
    update: function update() {
        if (this.isFreezed) return;

        // grounds & platforms (one-way collisions)
        this.game.physics.arcade.collide(this.player, this.groups.grounds, this.player.onGround, null, this.player);
        this.game.physics.arcade.collide(this.groups.collectable, this.groups.grounds, null, null, this);
        this.game.physics.arcade.collide(this.groups.enemies, this.groups.grounds, null, null, this);

        // breakable/hittable blocks
        this.game.physics.arcade.collide(this.player, this.groups.hittable, this.onHit, null, this);
        this.game.physics.arcade.collide(this.groups.collectable, this.groups.hittable, null, null, this);
        // bonus - powerup: collectables
        this.game.physics.arcade.overlap(this.player, this.groups.collectable, this.onCollect, null, this);

        // enemy ammos
        var _group;
        for (var i = 0; i < this.ammosGroupsLength; ++i) {
            _group = this.ammosGroups[i];
            this.game.physics.arcade.collide(this.player, _group, this.player.onHit, null, this.player);
            this.game.physics.arcade.collide(_group, this.groups.grounds, null, null, this);
            this.game.physics.arcade.collide(_group, this.groups.hittable, null, null, this);
        }
        for (var i = 0; i < this.bulletsGroupsLength; ++i) {
            _group = this.bulletsGroups[i];
            this.game.physics.arcade.collide(this.player, _group, this.player.onHit, null, this.player);
            this.game.physics.arcade.collide(_group, this.groups.grounds, this.onDestroy, null, this);
            this.game.physics.arcade.collide(_group, this.groups.hittable, this.onDestroy, null, this);
        }

        // player ammos
        this.game.physics.arcade.collide(this.groups.enemies, this.groups.playerAmmos, this.onHitEnemy, null, this);
        this.game.physics.arcade.collide(this.groups.playerAmmos, this.groups.grounds, this.onDestroy, null, this);
        this.game.physics.arcade.collide(this.groups.playerAmmos, this.groups.hittable, this.onDestroy, null, this);

        var _deltaTime = this.game.time.physicsElapsed;

        if (this.cursors.left.isDown) {
            this.player.moveLeft.call(this.player, _deltaTime);
            this.camera.lookTo(-1);
        } else if (this.cursors.right.isDown) {
            this.player.moveRight.call(this.player, _deltaTime);
            this.camera.lookTo(1);
        } else {
            this.player.stand.call(this.player);
        }

        if (this.cursors.action.isDown) {
            var _collision = this.game.physics.arcade.overlap(this.player, this.groups.triggerable, this.onTrigger, null, this);
            if (!_collision) {
                this.player.attack();
            }
        }
        if (this.cursors.reload.isDown) {
            this.player.reload();
        }

        // Jumping: need to be on ground
        // the longer we hold jumping btn, the higher we go
        if (this.cursors.up.isDown) {
            this.player.jump.call(this.player, _deltaTime);
        } else {
            this.player.stopJump.call(this.player);
        }
    },

    onHit: function onHit(player, other) {
        if (!player.body.wasTouching.none) return;
        other.hit();
    },

    onTrigger: function onTrigger(player, trigger) {
        if (!trigger.on) {
            trigger.activate();
        } else {
            trigger.deactivate();
        }
    },

    onCollect: function onCollect(player, collectable) {
        if (collectable.data.onCollect) {
            this.game.gui.showInfos(collectable.data.onCollect, 3.5);
        }
        this.player.onCollect(player, collectable);
    },

    onHitEnemy: function onHitEnemy(enemy, ammo) {
        enemy.hit.call(enemy);
        // better not used destroy: avoid getting an error in the physics loop
        ammo.kill();
    },

    onDestroy: function onDestroy(ammo, ground) {
        ammo.kill();
    },

    resize: function resize() {
        var _w = window.Game.canvas.clientWidth;
        var _h = window.Game.canvas.clientHeight;

        this.camera.lookBounds.offsetX = -_w * 0.5;
        this.backdrop.cameraOffset.y = -(this.data.world.height * this.data.tileSize - this.game.height);
        this.backdrop.resize();
    },

    /**
     * 'Freeze' the current game state:
     * Pause physics, but not the renderer.
     */
    freeze: function freeze() {
        this.physics.arcade.isPaused = true;
        this.isFreezed = true;
    },

    unFreeze: function unFreeze() {
        this.physics.arcade.isPaused = false;
        this.isFreezed = false;
    },

    // Phaser.Game.State interface
    destroy: function destroy() {
        this.cache.destroy();
        //this.game.cache = new Phaser.Cache( this.game );
        this.game.load.reset();
        this.game.load.removeAll();

        this.game.gui.destroy();
        delete this.game.gui;

        this.backdrop = null;
        this.cursors = null;
        this.player = null;
        this.game = null;

        this.ammosGroups = [];
        this.ammosGroupsLength = 0;
        this.bulletsGroups = [];
        this.bulletsGroupsLength = 0;

        this.groups = {};
        this.data = {};
    }
};

exports.default = playGame;

},{"../modules/GUI.js":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Transform = require('../utils/Transform.jsx');

var _Transform2 = _interopRequireDefault(_Transform);

var _Vector = require('../utils/Vector3.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = require('../utils/Vector2.jsx');

var _Vector4 = _interopRequireDefault(_Vector3);

var _app = require('../app.jsx');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A grid, each panel/case will be rotated according to cursor's position
 */
var Grid3D = function () {

    // use one Transform object for all panels
    function Grid3D() {
        _classCallCheck(this, Grid3D);

        this.distCurve = new Bezier(0, 0, 0.3, 0, 0.7, 1, 1, 1);
        this.panels = [];
        this.radius = 450;
        this.factor = 60;
        this.light = new _Vector2.default(-0.3, -0.2, 1);
        this._m = new _Transform2.default();

        this.light = this.light.normalize();
    }
    // rotation curve


    _createClass(Grid3D, [{
        key: 'init',
        value: function init($page) {
            var _this = this;
            this.panels = [];

            $page.find('li').each(function (i) {
                var $this = $(this);
                var _panel = {
                    x: $this.position().left + $this.width() * 0.5,
                    y: $this.position().top + $this.height() * 0.5,
                    $el: $this
                };
                _this.panels.push(_panel);

                if (_app2.default.IS_FIREFOX || _app2.default.IS_IE) {
                    $this.find('.overlay').css('clip-path', 'url("#panel-out")');

                    $this.on('mouseover', function () {
                        $this.find('.overlay').css('clip-path', 'url("#panel-over")');
                    }).on('mouseout', function () {
                        $this.find('.overlay').css('clip-path', 'url("#panel-out")');
                    });
                }

                // css @keyframe animation will make img crisp at the end
                // css transition too... no solution
                /*$this.find('.thumb').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                 $(this).toggleClass('over');
                 });
                 $this.find('.thumb').on('mouseout', function() {
                 $(this).removeClass('over');
                 });*/
            });

            this.$el = $page.parents('section:first');
            this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            for (var i = 0; i < this.panels.length; ++i) {
                var _panel = this.panels[i];

                // dist. from panel (original) center (stored after 3d transform)
                var _deltaX = (e.clientX - _panel.x) / this.radius;
                var _deltaY = (e.clientY - _panel.y) / this.radius;
                var _dist = this.distCurve.get(1 - Math.min(1, Math.sqrt(_deltaX * _deltaX + _deltaY * _deltaY))).y;

                // clamp -1;1
                _deltaX = Math.min(Math.max(-1, _deltaX), 1) * _dist;
                _deltaY = Math.min(Math.max(-1, _deltaY), 1) * _dist;

                // apply rotation + translation
                this._m.rotation = new _Vector2.default(_deltaY * this.factor, _deltaX * this.factor, 0);
                this._m.position = new _Vector2.default(0, 0, _dist * 50);
                var _styles = this._m.getMatrix();

                // get specular
                // var _light = new Vector3(-0.3,-0.2,1).normalize();
                var _dir = new _Vector2.default(0, 0, 1).forward(this._m);
                var _dot = this.light.dot(_dir);
                _dot = _dot * _dot * _dot * _dot;

                // ! WARNING !
                // css3 filter (filter, text-shadow, etc...) flatten 3d
                // element will be flatten into its parent
                // ->don't apply img filter on li
                _panel.$el.attr('style', _styles).find('img:first').css('-webkit-filter', 'brightness(' + (0.3 + _dot * _dot) + ')');
            }
        }
    }, {
        key: 'freeze',
        value: function freeze() {
            this.$el.off('mousemove');
        }
    }, {
        key: 'unfreeze',
        value: function unfreeze() {
            this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.$el.off('mousemove');
            this.$el.find('li').each(function (i) {
                $(this).off('mouseover mouseout click');
            });
        }
    }]);

    return Grid3D;
}();

exports.default = Grid3D;

},{"../app.jsx":1,"../utils/Transform.jsx":21,"../utils/Vector2.jsx":22,"../utils/Vector3.jsx":23}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header(cb) {
        var _this = this;

        _classCallCheck(this, Header);

        this.rectActive = {
            x1: 0, y1: 0,
            x2: 0, y2: 0,
            x3: 0, y3: 0,
            x4: 0, y4: 0
        };
        this.rectRandomRadius = 15;
        this.current = "";
        this.validHash = [];
        this.intro = true;

        this.$el = $(document.getElementsByTagName('header'));
        this.$markerActive = this.$el.find('span.current');
        this.$markerOver = this.$el.find('span.over');

        this.$lis = this.$el.find('li');
        this.$lis.each(function (i, el) {
            _this.validHash.push($(el).find('a').attr('href'));
        });

        setTimeout(function () {
            // get desired section
            var _hash = window.location.hash;
            if (_hash == '' || _hash == '#intro' || _this.validHash.indexOf(_hash) == -1) _hash = _this.validHash[0];
            _this.wanted = _hash;

            if (window.location.search != '?noIntro') {
                // play intro
                _this.setHash('#intro', true);
                // but highlight the wanted section
                _this.highlight(_this.$lis.find('a[href="' + _this.wanted + '"]'), false);
                // then go to the desired section
            }
        }, 150);

        this.callback = cb;

        this.$lis.on('mouseover', function (e) {
            clearTimeout(_this.outTimer);
            _this.highlight($(e.currentTarget));
        }).on('mouseout', function (e) {
            _this.outTimer = setTimeout(function () {
                _this.highlight($('header li.active'));
            }, 300);
        }).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    /**
     * Callback of window.onhashchange
     * @param e
     */


    _createClass(Header, [{
        key: 'onHashChange',
        value: function onHashChange(e) {
            var _hash = e && e.newURL ? '#' + e.newURL.split('#')[1] : window.location.hash;
            if (_hash.indexOf('?') != -1) _hash = _hash.split('?')[0];

            if (this.validHash.indexOf(_hash) == -1) {
                _hash = this.validHash[0];
                window.location.hash = _hash;
            }

            if (this.current != _hash) {
                this.select(_hash);
            }
        }
    }, {
        key: 'setHash',
        value: function setHash(hash, navigate) {
            if (this.current != hash) {
                window.location.hash = hash;
                if (navigate) this.select(hash);
            }
        }
    }, {
        key: 'select',
        value: function select(hash) {
            this.current = hash;
            this.$lis.removeClass('active');

            var $target;
            if (hash == "") {
                $target = this.$lis.eq(0).addClass('active');
                this.current = this.$lis.eq(0).attr('href');
            } else {
                $target = this.$lis.find('a[href="' + hash + '"]').parent().addClass('active');
            }

            if ($target.length) this.highlight($target, true);
            ga('send', 'pageview', this.current);
            this.callback(this.current);
        }
    }, {
        key: 'highlight',
        value: function highlight($target, selected) {
            if (!$target || !$target.length) return;

            this.$markerOver.css({ width: $target.outerWidth(), left: $target.offset().left });

            if (selected) {
                this.$markerActive.css({ width: $target.outerWidth(), left: $target.offset().left });

                if (this.$bgActive) {
                    this.$bgActive.css({ width: $target.outerWidth() + this.rectRandomRadius * 2, left: $target.offset().left - this.rectRandomRadius });

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
                    if (_animation.beginElement) _animation.beginElement();else {
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

    }, {
        key: 'createBg',
        value: function createBg($parent) {
            var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttributeNS(null, "points", "0,0 0,0 0,0 0,0");
            poly.setAttributeNS(null, 'fill', '#ffb162');
            $parent.find('svg')[0].appendChild(poly);

            var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttributeNS(null, 'attributeName', 'points');
            animate.setAttributeNS(null, 'begin', 'indefinite');
            animate.setAttributeNS(null, 'dur', '240ms');
            animate.setAttributeNS(null, 'to', '0,0 0,0 0,0 0,0');
            animate.setAttributeNS(null, 'fill', 'freeze');

            //colors = ['#ffb162', '#b3474b'];

            $parent.find('polygon')[0].appendChild(animate);
        }
    }, {
        key: 'resize',
        value: function resize() {
            var $target = $('header li.active');
            this.$markerOver.css({ width: $target.outerWidth(), left: $target.offset().left });
            this.$markerActive.css({ width: $target.outerWidth(), left: $target.offset().left });
            if (this.$bgActive) {
                this.$bgActive.css({ width: $target.outerWidth() + this.rectRandomRadius * 2, left: $target.offset().left - this.rectRandomRadius });
            }
        }
    }, {
        key: 'goBackToNineties',
        value: function goBackToNineties() {
            var _this2 = this;

            this.$bgActive = this.$el.find('div.current');
            //this.$bgOver = this.$el.find('div.over');
            this.createBg(this.$bgActive);
            //this.createBg( this.$bgOver );

            if (!App.IS_MOBILE) {
                this.$name = this.$el.find('.profile:first .name');
                this.$el.find('.avatar:first').randomPoly().on('update', this.updateName.bind(this));
                this.$el.find('.avatar:first').data('randomPoly').update();
            }

            this.$lis.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this2.setHash($(e.currentTarget).find('a').attr('href'));
            });
        }

        /**
         * Display the real hash
         * Used when intro is displayed before the desired page
         */

    }, {
        key: 'resume',
        value: function resume() {
            window.onhashchange = $.proxy(this.onHashChange, this);

            window.history.pushState({}, "", "?noIntro" + this.wanted);

            this.setHash(this.wanted, true);
        }

        /**
         * Set "name" skew, when avatar background change (over, page change)
         * @param e
         * @param rect
         */

    }, {
        key: 'updateName',
        value: function updateName(e, rect) {
            // MOVE NAMES
            // assume initial -5.5deg rotation
            var _skew = -(Math.atan2(rect.y3 - rect.y2, rect.x3 - rect.x2) * 180 / Math.PI - 90) + 5.5;
            this.$name.css('-webkit-transform', 'skewX(' + _skew + 'deg)').css('-ms-transform', 'skewX(' + _skew + 'deg)');

            // left offset
            var _offset = (rect.x2 + rect.x3) * .5 + 10;
            this.$name.css('left', _offset);
        }
    }]);

    return Header;
}();

exports.default = Header;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
    function Page() {
        _classCallCheck(this, Page);

        this.$el = null;
        this.tpl = '';
        this.json = '';
        this.data = null;
        this.assetPercent = 5;
        this.percent = 0;
        this.jsonPercent = 5;
    }

    // already stored by App... need refacto


    _createClass(Page, [{
        key: 'load',
        value: function load() {
            Page.LOADING.removeClass('animate complete').attr('value', 0);

            // if static page, go directly to loaded
            if (!this.json || this.json == '') {
                Page.LOADING.attr('value', 100);
                this.loaded();
                return;
            }

            var _proxy = $.proxy(this.jsonLoaded, this);
            $.ajax({
                dataType: "json",
                url: this.json,
                success: _proxy
            });
        }
    }, {
        key: 'jsonLoaded',
        value: function jsonLoaded(data) {
            var _loader = new createjs.LoadQueue(false);
            _loader.on("fileload", this.udpateLoading, this);
            _loader.on("complete", this.loaded, this);
            var _manifest = [];

            this.percent += this.jsonPercent;
            this.data = data;

            var l = data.length;
            this.assetPercent = (100 - this.jsonPercent) / l;

            for (var i = 0; i < l; ++i) {
                _manifest.push({ id: data[i].title, src: data[i].image });
            }
            _loader.loadManifest(_manifest);

            Page.LOADING.attr('value', this.percent);
        }
    }, {
        key: 'udpateLoading',
        value: function udpateLoading() {
            this.percent += this.assetPercent;
            Page.LOADING.attr('value', this.percent);
        }
    }, {
        key: 'loaded',
        value: function loaded() {
            var _this = this;

            this.percent = 100;
            Page.LOADING.attr('value', this.percent);

            this.render();

            setTimeout(function () {
                _this.$el.trigger("loaded");
            }, 200);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.tpl != '') {
                if (this.processData) this.processData();

                var _tpl = Tpl[this.tpl](this.data);
                this.$el.html(_tpl);
            }
        }

        /**
         * initialization: called when loading is complete by App.
         * @see App.sectionLoaded
         */

    }, {
        key: 'init',
        value: function init() {}
    }, {
        key: 'resize',
        value: function resize() {}

        /**
         * "pause" the page.
         * Called when changing page & on popin open/close.
         * @see App.onPopinOpen
         */

    }, {
        key: 'freeze',
        value: function freeze() {}
    }, {
        key: 'unfreeze',
        value: function unfreeze() {}

        /**
         * Remove all resources
         * Don't destroy the page, but destroy all the resources that the page instanciate on init
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.data = null;
            this.$el.empty();
        }
    }]);

    return Page;
}();

Page.LOADING = $(document.getElementById('loading'));
;

exports.default = Page;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pagination system.
 * Handle page's transition, controls & menu.
 */
var Pagination = function () {

    // swipe minnimu distance (px)
    function Pagination($el, callback) {
        var _this2 = this;

        _classCallCheck(this, Pagination);

        this.current = 0;
        this.num = 0;
        this.$pages = [];
        this.swipeThreshold = 70;
        this.swipeMaxDuration = 300;
        this._touch = {
            x: 0,
            y: 0
        };
        this._swipeStart = 0;

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
        this.$pagination.find('li').on('click', function () {
            _this.goTo($(this).data('index'));
        }).find('button').on('focus', function () {
            $(this).parent().data('randomPoly').update();
        }).on('blur', function () {
            $(this).parent().data('randomPoly').reset();
        });

        this.resize();

        if (App.IS_TACTILE) {
            this.$container[0].addEventListener('touchstart', function (e) {
                var _touch = e.changedTouches[0];
                _this2._touch.x = _touch.pageX;
                _this2._touch.y = _touch.pageY;
                _this2._swipeStart = new Date().getTime();
            }, false);

            this.$container[0].addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);

            this.$container[0].addEventListener('touchend', function (e) {
                var _touch = e.changedTouches[0];
                var _dist = _touch.pageX - _this2._touch.x;
                var _duration = new Date().getTime() - _this2._swipeStart;
                if (_duration <= _this2.swipeMaxDuration && Math.abs(_dist) >= _this2.swipeThreshold) {
                    e.preventDefault();
                    if (_dist > 0) {
                        _this2.previous();
                    } else {
                        _this2.next();
                    }
                }
            }, false);
        }

        this.callback = callback;
        this.goTo(0);
    }
    // swipe max duration (ms)


    _createClass(Pagination, [{
        key: 'next',
        value: function next() {
            this.goTo(this.current + 1);
        }
    }, {
        key: 'previous',
        value: function previous() {
            this.goTo(this.current - 1);
        }
    }, {
        key: 'goTo',
        value: function goTo(id) {
            var _this3 = this;

            if (id < 0) return;
            if (id >= this.num) return;

            if (id == 0) this.$previous.addClass('inactive');else this.$previous.removeClass('inactive');

            if (id == this.num - 1) this.$next.addClass('inactive');else this.$next.removeClass('inactive');

            if (this.$current) {
                this.$pagination.find('li.active').removeClass('active').data('randomPoly').reset();
            }

            this.current = id;
            this.$current = $(this.$pages[this.current]);
            this.$container.css('left', -this.pageWidth * this.current);

            this.$pagination.find('li:eq(' + this.current + ')').addClass('active').data('randomPoly').update();

            setTimeout(function () {
                _this3.callback(_this3.$current);
            }, 0);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.pageWidth = this.$container.parent().width();

            this.$pages.width(this.pageWidth);
            this.$container.width(this.pageWidth * this.num).css('left', -this.pageWidth * this.current);

            // find li size to calculate page dimensions
            // -> 3d transform affects render size, so, don't get dom values
            // -> img ratio 1.382
            var pageH = this.$container.height();
            var h = Math.min(250, pageH * (App.IS_TACTILE ? 0.35 : 0.4));
            var w = h * 1.382;

            var _pH = h + h + pageH * 0.025;
            var _pW = w + w + w + 2 * (this.pageWidth * 0.025);

            var _this = this;
            var _css = {
                'left': (this.pageWidth - _pW) * 0.5 + 'px',
                'top': (pageH - _pH) * 0.5 + 'px'
            };
            this.$pages.each(function () {
                $(this).find('ul').css(_css);
            });
        }
    }]);

    return Pagination;
}();

exports.default = Pagination;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Transform = require('../utils/Transform.jsx');

var _Transform2 = _interopRequireDefault(_Transform);

var _Vector = require('../utils/Vector3.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

var _app = require('../app.jsx');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popin = function () {

    // debug PhysicsJS
    function Popin(el, tpl) {
        var _this2 = this;

        _classCallCheck(this, Popin);

        this.$el = null;
        this.tpl = null;
        this.customClass = '';
        this.factor = 20;
        this.debug = false;
        this._m = new _Transform2.default();

        this.$el = $(el);

        // dynamic content
        if (tpl) this.tpl = tpl;
        // static
        else {
                setTimeout(function () {
                    _this2.$el.find('.js-random-poly').randomPoly({
                        firstUpdate: true
                    });
                }, 2000);
            }
    }

    _createClass(Popin, [{
        key: 'load',
        value: function load(url, className) {
            var _this3 = this;

            $.ajax({
                dataType: "json",
                url: url,
                success: function success(data) {
                    _this3.render(data);
                }
            });

            ga('send', 'event', 'popin', 'open', url);

            if (className) {
                this.customClass = className;
                this.$el.addClass(this.customClass);
            } else {
                this.customClass = '';
            }
        }
    }, {
        key: 'render',
        value: function render(data) {
            var _this4 = this;

            if (this.tpl != '') {
                var _tpl = Tpl[this.tpl](data);
                this.$el.find('article:first').html(_tpl);
            }

            setTimeout(function () {
                _this4.$el.find('.js-random-poly').randomPoly({
                    firstUpdate: true
                });
                _this4.$el.find('.js-random-btn').randomPoly({
                    padding: 15,
                    random: 20
                });
                _this4.$el.find('.js-popup').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var _this = $(this);

                    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
                    var _w = _this.data('width');
                    var _h = _this.data('height');

                    var _l = (width - _w) * 0.5;
                    var _t = (height - _h) * 0.5;

                    window.open(_this.attr('href'), "Flash Game", "titlebar=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no, scrollbars=no, " + "width=" + _w + ", height=" + _h + ", " + "top=" + _t + ", left=" + _l);
                });
            }, 150);

            this.open();
        }
    }, {
        key: 'open',
        value: function open() {
            var _this5 = this;

            this.$el.show().attr('open', true).find('article:first').off(_app2.default.TRANSITION_END).on(_app2.default.TRANSITION_END, this.onTransitionEnd.bind(this));
            this.$el.find('h1').focus();

            this.$el.find('.js-close').off('click').on('click', function (e) {
                e.preventDefault();
                _this5.close();
            });

            // need delay to enable animation on childrens
            setTimeout(function () {
                _this5.$el.addClass('opened');
            }, 0);
            this.$el.off('mousemove').on('mousemove', $.proxy(this.onMouseMove, this));

            // use document body as Signal
            $(document.body).trigger('popin:open');

            //
            var canvas = document.getElementById('domRenderer');
            if (!canvas) return;

            canvas.width = this.$el.width();
            canvas.height = this.$el.height();

            // INIT DEBUG
            if (this.debug) {
                canvas = document.getElementById('debug');
                canvas.width = this.$el.width();
                canvas.height = this.$el.height();
            }

            var _this = this;

            Physics(function (world) {
                var bounds = Physics.aabb(0, 0, canvas.width, canvas.height);
                var renderer = Physics.renderer('dom', {
                    el: 'domRenderer'
                });

                world.add(renderer);
                world.add(Physics.behavior('edge-collision-detection', {
                    aabb: bounds
                }));

                world.add(Physics.behavior('constant-acceleration'));
                world.add(Physics.behavior('body-impulse-response'));
                world.add(Physics.behavior('body-collision-detection'));
                world.add(Physics.behavior('sweep-prune'));

                Physics.util.ticker.on(function (time, dt) {
                    world.step(time);
                });

                world.on('step', function () {
                    world.render();

                    // DEBUG
                    if (_this.debug) {
                        var _bodies = world.getBodies();
                        if (_bodies.length > 1) {
                            for (var i = 0; i < _bodies.length; ++i) {
                                _this.debug(_bodies[i].geometry, _bodies[i].state.pos);
                            }
                        }
                    }
                });

                Physics.util.ticker.start();

                _this.$el.find('.js-breakable').breakable({
                    physics: world
                }).on('click', function () {
                    var $li = $(this);
                    _this.$el.find('figure ul').append($li.detach());
                    setTimeout(function () {
                        $li.removeClass('broken');
                    }, 100);
                });
            });
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            // -> -0.5 / 0.5 from center of the screen
            var _deltaX = (e.clientX - screen.availWidth * 0.5) / screen.availWidth;
            var _deltaY = (e.clientY - screen.availHeight * 0.5) / screen.availHeight;

            // apply rotation + translation
            this._m.rotation = new _Vector2.default(_deltaY * this.factor, _deltaX * this.factor, 0);

            this.$el.find('figure').attr('style', this._m.getMatrix());
        }
    }, {
        key: 'debug',
        value: function debug(geometry, center) {
            var canvas = document.getElementById('debug');
            //canvas.width = $(document).width();
            //canvas.height = $(document).height();

            var context = canvas.getContext('2d');
            context.lineWidth = 2;
            context.strokeStyle = "#0000FF";

            var vertices = geometry.vertices;

            //context.beginPath();
            var l = vertices.length;
            context.moveTo(vertices[0].x + center.x, vertices[0].y + center.y);
            for (var i = 1; i < l; ++i) {
                context.lineTo(vertices[i].x + center.x, vertices[i].y + center.y);
            }
            context.lineTo(vertices[0].x + center.x, vertices[0].y + center.y);
            context.stroke();

            context.moveTo(center.x, center.y - 5);
            context.lineTo(center.x, center.y + 5);
            context.stroke();

            context.moveTo(center.x - 5, center.y);
            context.lineTo(center.x + 5, center.y);
            context.stroke();
        }
    }, {
        key: 'close',
        value: function close() {
            this.$el.removeAttr('open').removeClass('opened').removeClass(this.customClass);
            this.customClass = '';

            // use document body as Signal
            $(document.body).trigger('popin:close');
        }
    }, {
        key: 'onTransitionEnd',
        value: function onTransitionEnd(e) {
            console.log(this.$el.attr('open'));

            this.$el.find('article:first').off(_app2.default.TRANSITION_END);

            // chrome || ie
            if (!this.$el.attr('open') || this.$el.attr('open') == undefined) {
                this.$el.hide();
            }
        }
    }]);

    return Popin;
}();

exports.default = Popin;

},{"../app.jsx":1,"../utils/Transform.jsx":21,"../utils/Vector3.jsx":23}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('../modules/Page.jsx');

var _Page3 = _interopRequireDefault(_Page2);

var _GameMenu = require('../modules/GameMenu.js');

var _GameMenu2 = _interopRequireDefault(_GameMenu);

var _GamePlay = require('../modules/GamePlay.js');

var _GamePlay2 = _interopRequireDefault(_GamePlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_Page) {
    _inherits(About, _Page);

    function About() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, About);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(About)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.tpl = 'app/tpl/about.html', _this.$el = $('#about'), _this.json = 'json/about.json', _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(About, [{
        key: 'jsonLoaded',
        value: function jsonLoaded(data) {
            var _loader = new createjs.LoadQueue(false);
            _loader.on("fileload", this.udpateLoading, this);
            _loader.on("complete", this.loadFont, this);
            var _manifest = [];

            this.percent += this.jsonPercent;
            this.data = data;

            // preload atlas textures + json
            var l = 0;
            for (var state in data.textures) {
                for (var id in data.textures[state]) {
                    _manifest.push({ id: id, src: data.textures[state][id].path });
                    ++l;
                    if (data.textures[state][id].json) {
                        _manifest.push({ id: id + "json", src: data.textures[state][id].json });
                        ++l;
                    }
                }
            }

            // keep 10% for the font (env. 7kb)
            this.assetPercent = (90 - this.jsonPercent) / l;

            _loader.loadManifest(_manifest);

            $('#loading').add('animate').attr('value', this.percent);
        }
    }, {
        key: 'loadFont',
        value: function loadFont() {
            WebFont.load({
                custom: {
                    families: ['press_start_2pregular'],
                    urls: ['fonts/pressstart2p.css']
                },
                active: this.loaded.bind(this)
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var w = this.$el.width();
            var h = this.$el.height();

            this.$el.on('state:created', this.resize.bind(this));

            this.game = new Phaser.Game(w, h, Phaser.CANVAS, this.$el.attr('id'));
            this.game.state.add("Menu", _GameMenu2.default);
            this.game.state.add("Play", _GamePlay2.default);

            this.game.state.states.Menu.data = this.game.state.states.Play.data = this.data;

            this.game.state.start("Menu");

            window.Game = this.game;
        }
    }, {
        key: 'resize',
        value: function resize() {
            var w = this.$el.width();
            var h = this.$el.height();
            this.game.width = w;
            this.game.height = h;

            if (this.game.renderType === Phaser.CANVAS) {
                Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
            }

            this.game.renderer.resize(w, h);
            this.game.camera.setSize(w, h);
            this.game.state.getCurrentState().resize();
        }
    }, {
        key: 'freeze',
        value: function freeze() {
            this.game.paused = true;
        }
    }, {
        key: 'unfreeze',
        value: function unfreeze() {
            this.game.paused = false;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.$el.off('state:created');

            this.game.state.getCurrentState().destroy();
            this.game.state.destroy();
            this.game.destroy();
        }
    }]);

    return About;
}(_Page3.default);

exports.default = About;

},{"../modules/GameMenu.js":5,"../modules/GamePlay.js":6,"../modules/Page.jsx":9}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('../modules/Page.jsx');

var _Page3 = _interopRequireDefault(_Page2);

var _Transform = require('../utils/Transform.jsx');

var _Transform2 = _interopRequireDefault(_Transform);

var _Vector = require('../utils/Vector3.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CV = function (_Page) {
    _inherits(CV, _Page);

    function CV() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, CV);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CV)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.$el = $('#cv'), _this.tpl = 'app/tpl/cv.html', _this.json = 'json/cv.json', _this.orientation = 0, _this._m = new _Transform2.default(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CV, [{
        key: 'init',
        value: function init() {
            this.$timeline = this.$el.find('.timeline:first');

            if (App.IS_TACTILE) {
                window.addEventListener("deviceorientation", this.onOrientation.bind(this));
                window.addEventListener("orientationchange", this.onOrientationChage.bind(this));
            } else {
                this.$el.on('mousemove', this.onMouseMove.bind(this));
            }

            this.$el.on('scroll', this.onScroll.bind(this));
            this.onScroll();
        }
    }, {
        key: 'jsonLoaded',
        value: function jsonLoaded(data) {
            this.data = data;
            $('#loading').attr('value', 100);

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
                        label: function label(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];
                            return value + "%";
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
            this.$el.find('li.chart').each(function () {
                var id = this.id;
                var ctx = this.getElementsByTagName('canvas')[0];

                var _gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 250);
                _gradient.addColorStop(0, "rgba(147, 189, 245, 0.5)");
                _gradient.addColorStop(1, "rgba(115, 153, 115, 0.5)");

                var _yellow = 'rgba(255,228,118, 1)';
                var _orange = 'rgba(255,177,98, 1)';
                var _red = 'rgba(135,54,75, 1)';

                var _dataSet = {
                    labels: [],
                    datasets: [{
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
                    }]
                };
                // preprocess data
                var _data = data.skills.domain[id];
                var _labels = [];
                for (var i = 0; i < _data.length; ++i) {
                    var _skill = _data[i];
                    _dataSet.labels.push(_skill.name);
                    _dataSet.datasets[0].data.push(_skill.level / 5 * 100);
                }
                // build Chart
                var _skillsRadar = new Chart(ctx, {
                    type: 'radar',
                    data: _dataSet,
                    options: _options
                });
            });

            this.$el.trigger("loaded");
        }
    }, {
        key: 'resize',
        value: function resize() {}
    }, {
        key: 'freeze',
        value: function freeze() {}
    }, {
        key: 'clear',
        value: function clear() {}
    }, {
        key: 'onOrientation',
        value: function onOrientation(e) {
            if (this.orientation) {
                this.rotate(-e.beta * 1.2, (e.gamma + 90) * 0.33);
            } else {
                // gamma: -90 front | 0 horizontal
                this.rotate((e.gamma + 90) * 0.33, -e.beta * 1.2);
            }
        }
    }, {
        key: 'onOrientationChage',
        value: function onOrientationChage(e) {
            switch (window.orientation) {
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
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            // -> -0.5 / 0.5 from center of the screen
            var _deltaX = (e.clientX - screen.availWidth * 0.5) / screen.availWidth;
            var _deltaY = (e.clientY - screen.availHeight * 0.5) / screen.availHeight;

            this.rotate(_deltaY * 10, _deltaX * 10);
        }
    }, {
        key: 'rotate',
        value: function rotate(x, y) {
            // tilt
            this._m.rotation.x = x;
            // pan
            this._m.rotation.y = y;

            this.$timeline.attr('style', this._m.getMatrix());
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            var _stop = this.$el.scrollTop();
            var _h = window.innerHeight * 0.5;

            this.$el.find('article div').each(function () {
                var $this = $(this);
                if (!$this.hasClass('visible')) {
                    var _top = $this.offset().top;
                    if (_top < _stop + _h) {
                        $this.addClass('visible');
                    }
                }
            });
        }
    }]);

    return CV;
}(_Page3.default);

exports.default = CV;

},{"../modules/Page.jsx":9,"../utils/Transform.jsx":21,"../utils/Vector3.jsx":23}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('../modules/Page.jsx');

var _Page3 = _interopRequireDefault(_Page2);

var _Grid3D = require('../modules/Grid3D.jsx');

var _Grid3D2 = _interopRequireDefault(_Grid3D);

var _Pagination = require('../modules/Pagination.jsx');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Popin = require('../modules/Popin.jsx');

var _Popin2 = _interopRequireDefault(_Popin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Games = function (_Page) {
    _inherits(Games, _Page);

    function Games() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Games);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Games)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.json = 'json/games.json', _this.tpl = 'app/tpl/games.html', _this.$el = $('#games'), _this.grid3D = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Games, [{
        key: 'processData',
        value: function processData() {
            var _l = this.data.length;
            var numPage = Math.ceil(_l / 6);
            var _pages = [];
            _pages[0] = [];
            var _currentPage = 0;
            for (var i = 0; i < _l; ++i) {

                if (i >= _currentPage * 6 + 6) {
                    ++_currentPage;
                    _pages[_currentPage] = [];
                }
                _pages[_currentPage].push(this.data[i]);
            }

            var json = {
                num: numPage,
                pages: _pages
            };
            this.data = json;
        }
    }, {
        key: 'init',
        value: function init() {
            this.pagination = new _Pagination2.default(this.$el.find('.all-pages'), $.proxy(this.initPage, this));
            if (!App.IS_TACTILE) {
                this.grid3D = new _Grid3D2.default();
            }

            this.popin = new _Popin2.default(document.getElementById("popin"), 'app/tpl/gamePopin.html');
        }
    }, {
        key: 'initPage',
        value: function initPage($page) {
            var _this2 = this;

            this.$el.find('a[data-json]').on('click', function (e) {
                console.log('click');
                var $this = $(e.currentTarget);
                _this2.popin.load($this.data('json'), 'games');
            });

            if (this.grid3D) this.grid3D.init($page);
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.pagination.resize();
        }
    }, {
        key: 'freeze',
        value: function freeze() {
            if (this.grid3D) this.grid3D.freeze();
        }
    }, {
        key: 'unfreeze',
        value: function unfreeze() {
            if (this.grid3D) this.grid3D.unfreeze();
        }
    }]);

    return Games;
}(_Page3.default);

exports.default = Games;

},{"../modules/Grid3D.jsx":7,"../modules/Page.jsx":9,"../modules/Pagination.jsx":10,"../modules/Popin.jsx":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('../modules/Page.jsx');

var _Page3 = _interopRequireDefault(_Page2);

var _Background = require('../modules/Background.jsx');

var _Background2 = _interopRequireDefault(_Background);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Intro = function (_Page) {
    _inherits(Intro, _Page);

    function Intro() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Intro);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Intro)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.tpl = 'app/tpl/intro.html', _this.$el = $(document.getElementById('intro')), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Intro, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var _img = new Image();
            _img.onload = function () {
                _this2.bg = new _Background2.default(_this2.$el.find('.page-background:first')[0], 1000);
                _this2.resize();

                // intro
                _this2.$el.find('blockquote p:last').on('transitionend oTransitionEnd transitionend webkitTransitionEnd', function () {
                    _this2.$el.find('blockquote p:last').off('transitionend oTransitionEnd transitionend webkitTransitionEnd');
                    _this2.$el.trigger('intro:complete');
                });
                _this2.$el.addClass('intro');
            };
            _img.src = $(document.getElementById('img-source')).attr('src');
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.bg.resize();
        }
    }, {
        key: 'freeze',
        value: function freeze() {
            this.bg.pause();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.bg.destroy();
            this.bg = null;
        }
    }]);

    return Intro;
}(_Page3.default);

exports.default = Intro;

},{"../modules/Background.jsx":2,"../modules/Page.jsx":9}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('../modules/Page.jsx');

var _Page3 = _interopRequireDefault(_Page2);

var _Grid3D = require('../modules/Grid3D.jsx');

var _Grid3D2 = _interopRequireDefault(_Grid3D);

var _Pagination = require('../modules/Pagination.jsx');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Popin = require('../modules/Popin.jsx');

var _Popin2 = _interopRequireDefault(_Popin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Websites = function (_Page) {
    _inherits(Websites, _Page);

    function Websites() {
        var _Object$getPrototypeO;

        var _temp, _this2, _ret;

        _classCallCheck(this, Websites);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Websites)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.json = 'json/websites.json', _this2.tpl = 'app/tpl/websites.html', _this2.$el = $('#websites'), _this2.worldConfig = {
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
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Websites, [{
        key: 'processData',
        value: function processData() {
            var _l = this.data.length;
            var numPage = Math.ceil(_l / 6);
            var _pages = [];
            _pages[0] = [];
            var _currentPage = 0;
            for (var i = 0; i < _l; ++i) {

                if (i >= _currentPage * 6 + 6) {
                    ++_currentPage;
                    _pages[_currentPage] = [];
                }
                _pages[_currentPage].push(this.data[i]);
            }

            var json = {
                num: numPage,
                pages: _pages
            };
            this.data = json;
        }
    }, {
        key: 'init',
        value: function init() {
            this.pagination = new _Pagination2.default(this.$el.find('.all-pages'), $.proxy(this.initPage, this));
            if (!App.IS_TACTILE) {
                this.grid3D = new _Grid3D2.default();
            }

            this.popin = new _Popin2.default(document.getElementById("popin"), 'app/tpl/websitePopin.html');

            var _this = this;
        }
    }, {
        key: 'initPage',
        value: function initPage($page) {
            var _this3 = this;

            this.$el.find('a[data-json]').on('click', function (e) {
                var $this = $(e.currentTarget);
                _this3.popin.load($this.data('json'), 'websites');
            });

            if (this.grid3D) this.grid3D.init($page);
        }
    }, {
        key: 'resize',
        value: function resize() {}
    }]);

    return Websites;
}(_Page3.default);

exports.default = Websites;

},{"../modules/Grid3D.jsx":7,"../modules/Page.jsx":9,"../modules/Pagination.jsx":10,"../modules/Popin.jsx":11}],17:[function(require,module,exports){
'use strict';

(function ($) {

    $.fn.breakable = function (options) {
        return this.each(function () {
            if (!$.data(this, 'breakable')) {
                $.data(this, 'breakable', new Breakable(this, options));
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

    function Breakable(el, options) {
        this.$el = $(el);
        this.options = $.extend({}, _defaults, options);

        var _this = this;
        this.$el.on('click', function (e) {
            e.preventDefault();
            _this.explode.call(_this, e);
        });
    };

    Breakable.prototype.explode = function (e) {
        // relative impact position (from top left el)
        var _impact = { x: e.offsetX, y: e.offsetY };
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
                        _corner = { x: _w, y: 0 };
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
                        _corner = { x: 0, y: _h };
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
                        _corner = { x: _w, y: _h };
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
                        _corner = { x: 0, y: 0 };
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
            var _vertices = [{ x: _rect.x1, y: _rect.y1 }];
            if (_corner) {
                _vertices.push({ x: _corner.x, y: _corner.y });
            }
            _vertices.push({ x: _rect.x2, y: _rect.y2 });
            _vertices.push({ x: _impact.x, y: _impact.y });

            // if not convex, limit vertices to the triangle : start - corner - impact
            // (not convex could only occurs if vertices.length > 3)
            if (!Physics.geometry.isPolygonConvex(_vertices)) {}

            // get center
            var _center = Physics.geometry.getPolygonCentroid(_vertices);

            // make sure the poly is centered into its parent
            _piece.find(this.options.content).attr('style', '-webkit-clip-path: ' + _tpl + ' transform: translate(-' + _center.x + 'px, -' + _center.y + 'px);');

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

                _bodies.push(_body);
            } else {
                _piece.addClass('break-part');
                this.$el.parent().append(_piece);
            }
        }

        if (this.options.physics) {
            this.options.physics.add(_bodies);
        }

        this.$el.addClass(this.options.class).trigger('broken');
    };
})(jQuery);

},{}],18:[function(require,module,exports){
'use strict';

(function ($) {

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
    $.fn.randomPoly = function (options) {
        return this.each(function () {
            if (!$.data(this, 'randomPoly')) {
                $.data(this, 'randomPoly', new RandomPoly(this, options));
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
    function RandomPoly(el, options) {
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
        if (!this.options.firstUpdate) this.reset();else this.update();

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

    RandomPoly.prototype.createPoly = function () {
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
            this.gradientId = this.$el[0].id + '-gradient';
            el.setAttributeNS(null, 'fill', 'url(#' + this.gradientId + ')');
        } else {
            el.setAttributeNS(null, 'fill', this.options.colors[0]);
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
            el.appendChild(_colorStop);
            _colorStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            _colorStop.setAttributeNS(null, 'offset', '100%');
            _colorStop.setAttributeNS(null, 'stop-color', '#b3474b');
            el.appendChild(_colorStop);
            this.$el.find('svg')[0].appendChild(el);
        }

        this.$el.find('svg').css({ top: -(this.options.random + this.options.padding), left: -(this.options.random + this.options.padding) });
    };

    /**
     * Return to the 'base' shape: defined by the element, or the width/height specified in options.
     */
    RandomPoly.prototype.update = function () {
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
        if (_animation.beginElement) _animation.beginElement();else {
            this.$el.find('polygon').attr('points', _points);
        }

        this.$el.trigger("update", [this.rect]);
    };

    RandomPoly.prototype.reset = function () {
        if (this.$el.hasClass('active')) return;

        var _points = '' + this.rect.x1 + ' ' + this.rect.y1 + ' ' + this.rect.x2 + ' ' + this.rect.y2 + ' ' + this.rect.x3 + ' ' + this.rect.y3 + ' ' + this.rect.x4 + ' ' + this.rect.y4;
        this.$el.find('polygon').attr('points', _points);

        if (this.options.colors.length > 1) {
            this.$el.find('polygon').attr('fill', 'url(#' + this.gradientId + ')');
        } else {
            this.$el.find('polygon').attr('fill', this.options.colors[0]);
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
        if (_animation.beginElement) _animation.beginElement();else {
            this.$el.find('polygon').attr('points', _points);
        }

        this.$el.trigger("reset", [this.rect]);
    };
})(jQuery);

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../utils/Vector2.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {

    /**
     * New physic particle.
     * @param {float} m Mass
     * @param {int} r Radius
     * @param x
     * @param y
     * @param {String} c A color, rgba format.
     * @constructor
     */
    function Particle(m, r, x, y, c) {
        _classCallCheck(this, Particle);

        this.alive = true;
        this.mass = 0;
        this.radius = 1;
        this.x = 0;
        this.y = 0;
        this.speed = new _Vector2.default(0, 0);
        this.limit = 24;
        this.gradient = null;

        this.mass = m;
        this.radius = r;
        this.color = c;
        // don't call position -> overrided by ParticleTrail
        this.x = x;
        this.y = y;
    }

    _createClass(Particle, [{
        key: 'position',
        value: function position(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: 'move',
        value: function move() {
            this.x += this.speed.x;
            this.y += this.speed.y;
        }
    }, {
        key: 'applyGravity',
        value: function applyGravity(p, duration) {
            // custom G constant
            var G = 10;
            var _contact = false;

            var dx = p.x - this.x;
            var dy = p.y - this.y;
            // square distance from black hole
            var d = dx * dx + dy * dy;

            if (d < p.radius * p.radius) {
                this.alive = false;
                _contact = true;
            }

            // minus other radius: maximum gravity will be on other surface (prevent infinite gravity force when near center)
            d = Math.max(p.radius, d);
            // gravity
            var f = G * (this.mass * p.mass / d) * duration;

            // force (direction)
            var _dir = new _Vector2.default(dx, dy).normalize().scale(f);

            this.speed.add(_dir).limit(this.limit);

            return _contact;
        }
    }, {
        key: 'randomImpulse',
        value: function randomImpulse(min, max, center) {
            // inital angle from center
            var _a = Math.atan(this.y - center.y, this.x - center.x);
            // add random -90° + 90°
            _a = _a + Math.random() * Math.PI - Math.PI * 0.5;
            var _factor = min + Math.random() * (max - min);
            this.speed.x = Math.cos(_a) * _factor;
            this.speed.y = Math.sin(_a) * _factor;
            this.alive = true;
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            if (!this.gradient) {
                this.gradient = ctx.createRadialGradient(this.x, this.y, 7, this.x, this.y, this.radius * 2);
                this.gradient.addColorStop(0, this.color);
                this.gradient.addColorStop(1, 'rgba(153,0,153,0)');
            }

            ctx.arc(this.x, this.y, this.radius * 2, 0, 2 * Math.PI);
            ctx.fillStyle = this.gradient;
            ctx.fill();
        }
    }]);

    return Particle;
}();

exports.default = Particle;

},{"../utils/Vector2.jsx":22}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../utils/Vector2.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

var _Particle2 = require('../utils/Particle.jsx');

var _Particle3 = _interopRequireDefault(_Particle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParticleTrail = function (_Particle) {
    _inherits(ParticleTrail, _Particle);

    /**
     * Need a constructor definition to create all member's class (object properties)
     */
    function ParticleTrail(m, r, x, y, c) {
        _classCallCheck(this, ParticleTrail);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticleTrail).call(this, m, r, x, y, c));

        _this.last = new _Vector2.default(0, 0);
        _this.last2 = new _Vector2.default(0, 0);
        _this.gradient2 = null;

        _this.position(x, y);
        return _this;
    }

    _createClass(ParticleTrail, [{
        key: 'position',
        value: function position(x, y) {
            this.x = this.last.x = this.last2.x = x;
            this.y = this.last.y = this.last2.y = y;
        }
    }, {
        key: 'move',
        value: function move() {
            this.last2.x = this.last.x;
            this.last2.y = this.last.y;

            this.last.x = this.x;
            this.last.y = this.y;

            this.x += this.speed.x;
            this.y += this.speed.y;
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            if (!this.gradient) {
                this.gradient = ctx.createLinearGradient(0, 0, 5, 0);
                this.gradient.addColorStop(0, this.color);
                this.gradient.addColorStop(1, 'rgba(255,255,255,0.5)');

                this.gradient2 = ctx.createLinearGradient(0, 0, 10, 0);
                this.gradient2.addColorStop(0, 'rgba(255,255,255,0.5)');
                this.gradient2.addColorStop(1, 'rgba(255,255,255,0)');
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = this.radius * 2;
            ctx.strokeStyle = this.gradient;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.last.x, this.last.y);
            ctx.stroke();

            ctx.lineWidth = this.radius;
            ctx.strokeStyle = this.gradient2;
            ctx.lineTo(this.last2.x, this.last2.y);
            ctx.stroke();
        }
    }]);

    return ParticleTrail;
}(_Particle3.default);

exports.default = ParticleTrail;

},{"../utils/Particle.jsx":19,"../utils/Vector2.jsx":22}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('../utils/Vector3.jsx');

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = require('../utils/Vector2.jsx');

var _Vector4 = _interopRequireDefault(_Vector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transform = function () {
    function Transform() {
        _classCallCheck(this, Transform);

        this.position = new _Vector2.default(0, 0, 0);
        this.scale = new _Vector2.default(1, 1, 1);
        this.rotation = new _Vector2.default(0, 0, 0);
        this.depth = new _Vector4.default(0, 0);
        this.prevision = 2;
        this.matrix3d = new Array(16);
        this.prefix = ["", "-webkit-", "-moz-", "-ms-"];
        this.toRad = Math.PI / 180;
    }

    _createClass(Transform, [{
        key: 'scale',
        value: function scale(v3) {
            this.scale = v3;
        }

        /**
         * Add the vector to the position
         * @param {Vector3} v3
         */

    }, {
        key: 'translate',
        value: function translate(v3) {
            this.position = v3;
        }

        /**
         * Add the vector to the rotation
         * @param {Vector3} v3
         */

    }, {
        key: 'rotate',
        value: function rotate(v3) {
            this.rotation = v3;
        }
    }, {
        key: 'update',
        value: function update() {
            var mathCosX = Math.cos(this.rotation.x * this.toRad);
            var mathSinX = Math.sin(this.rotation.x * this.toRad);
            var mathCosY = Math.cos(this.rotation.y * this.toRad);
            var mathSinY = Math.sin(this.rotation.y * this.toRad);
            var mathCosZ = Math.cos(this.rotation.z * this.toRad);
            var mathSinZ = Math.sin(this.rotation.z * this.toRad);

            //optim
            /*
            mathCosX = mathCosX.toFixed( this.precision );
            mathSinX = mathSinX.toFixed( this.precision );
            mathCosY = mathCosY.toFixed( this.precision );
            mathSinY = mathSinY.toFixed( this.precision );
            mathCosZ = mathCosZ.toFixed( this.precision );
            mathSinZ = mathSinZ.toFixed( this.precision );
            */
            this.matrix3d[0] = mathCosY * mathCosZ * this.scale.x;
            this.matrix3d[1] = -1 * mathSinZ;
            this.matrix3d[2] = mathSinY;
            this.matrix3d[3] = this.depth.y;
            this.matrix3d[4] = mathSinZ;
            this.matrix3d[5] = mathCosX * mathCosZ * this.scale.y;
            this.matrix3d[6] = mathSinX;
            this.matrix3d[7] = this.depth.x;
            this.matrix3d[8] = -1 * mathSinY;
            this.matrix3d[9] = -1 * mathSinX;
            this.matrix3d[10] = mathCosY * mathCosX;
            this.matrix3d[11] = 0;
            this.matrix3d[12] = this.position.x;
            this.matrix3d[13] = this.position.y;
            this.matrix3d[14] = this.position.z;
            this.matrix3d[15] = 1;
        }

        /**
         * use of matrix3d will break child preserve-3d
         * better separate component
         */

    }, {
        key: 'getMatrix',
        value: function getMatrix() {
            this.update();
            var css = '';
            for (var i = 0; i < this.prefix.length; ++i) {
                css += this.prefix[i] + "transform: matrix3d(" + this.matrix3d[0] + "," + this.matrix3d[1] + "," + this.matrix3d[2] + "," + this.matrix3d[3] + "," + this.matrix3d[4] + "," + this.matrix3d[5] + "," + this.matrix3d[6] + "," + this.matrix3d[7] + "," + this.matrix3d[8] + "," + this.matrix3d[9] + "," + this.matrix3d[10] + "," + this.matrix3d[11] + "," + this.matrix3d[12] + "," + this.matrix3d[13] + "," + this.matrix3d[14] + "," + this.matrix3d[15] + ");&#13;";
            }
            return css;
        }
    }, {
        key: 'getCss',
        value: function getCss() {
            this.update();

            var css = 'rotateX(' + this.rotation.x + 'deg) rotateY(' + -this.rotation.y + 'deg) rotateZ(' + this.rotation.z + 'deg)';
            css += ' translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, ' + this.position.z + 'px)';

            return css;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.position.x = this.position.y = this.position.z = 0;
            this.scale.x = this.scale.y = this.scale.z = 1;
            this.rotation.x = this.rotation.y = this.rotation.z = 0;
            this.depth.x = this.depth.y = 0;
        }
    }]);

    return Transform;
}();

exports.default = Transform;

},{"../utils/Vector2.jsx":22,"../utils/Vector3.jsx":23}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
    function Vector2(_x, _y) {
        _classCallCheck(this, Vector2);

        this.x = 0;
        this.y = 0;

        this.x = _x;
        this.y = _y;
    }

    _createClass(Vector2, [{
        key: "normalize",
        value: function normalize() {
            var _s = 1 / this.length();
            this.x *= _s;
            this.y *= _s;

            return this;
        }
    }, {
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "scale",
        value: function scale(f) {
            this.x *= f;
            this.y *= f;

            return this;
        }
    }, {
        key: "add",
        value: function add(v) {
            this.x += v.x;
            this.y += v.y;

            return this;
        }
    }, {
        key: "limit",
        value: function limit(value) {
            var _l = this.length();
            if (_l > value) {
                var _s = 1 / _l;
                this.x *= _s * value;
                this.y *= _s * value;
                this.normalize().scale(value);
            }
        }
    }]);

    return Vector2;
}();

exports.default = Vector2;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector3 = function () {
    function Vector3(_x, _y, _z) {
        _classCallCheck(this, Vector3);

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    _createClass(Vector3, [{
        key: "normalize",
        value: function normalize() {
            var _s = 1 / this.length();
            this.x *= _s;
            this.y *= _s;
            this.z *= _s;

            return this;
        }
    }, {
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }, {
        key: "dot",
        value: function dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
    }, {
        key: "forward",
        value: function forward(t) {
            var x = this.x,
                y = this.y,
                z = this.z;
            var e = t.matrix3d;

            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;

            return this.normalize();
        }
    }]);

    return Vector3;
}();

exports.default = Vector3;

},{}]},{},[1]);
