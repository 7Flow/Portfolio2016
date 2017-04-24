module.exports = function(grunt) {
    
    var DEV_PATH            = 'app/',
        DIST_PATH           = 'www/';
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n' +
' * FLOW: Portfolio 2016  \n' +
' * @package   Portfolio\n' +
' * @author    Florian Fievet\n' +
' * @copyright <%= grunt.template.today("yyyy") %> FLOW',
        
        sprite:{
            desktop: {
                algorithm: 'top-down',
                src: DEV_PATH+'sprites/*.png',
                destImg: DEV_PATH+'img/sprites.png',
                destCSS: DEV_PATH+'css/sprites.css'
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [["babelify", {presets: ["es2015", "stage-0", "stage-1", "stage-2"]}]]
                },
                src: ['app/js/app.jsx'],
                dest: 'app/js/build.js'
            }
        },

        handlebars: {
            options: {
                namespace: 'Tpl'
            },
            all: {
                files: {
                    "app/js/templates.js": ["app/tpl/**/*.html"]
                }
            }
        },
        
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7,
                    cache: false
                },
                files: [
                    {
                        expand: true,
                        cache: false,
                        cwd: DEV_PATH+'img/',
                        src: ['**/*.png'],
                        dest: DIST_PATH+'img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cache: false,
                        cwd: DEV_PATH+'img/',
                        src: ['**/*.jpg'],
                        dest: DIST_PATH+'img/',
                        ext: '.jpg'
                    }
                ]
            }
        },
        
        copy: {
            assets: {
                files: [
                    {expand: true, flatten: true, src: [DEV_PATH+'i18n/*'],         dest: DIST_PATH+'i18n', filter: 'isFile'}
                ]
            }
        },
        
        compass: {
            desktop: {
                options: {
                    sassDir: DEV_PATH+'sass/',
                    specify: DEV_PATH+'sass/app.scss',
                    cssDir: DEV_PATH+'css/'
                }
            },
            ie9: {
                options: {
                    sassDir: DEV_PATH+'sass/',
                    specify: DEV_PATH+'sass/ie9.scss',
                    cssDir: DIST_PATH+'css/'
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                expand: true,
                cwd: DIST_PATH,
                src: ['css/app.css'],
                dest: DIST_PATH,
                ext: '.min.css'
            }
        },
        
        concat: {
            css: {
                src: [
                    DEV_PATH+'css/*.css'
                ],
                dest: DIST_PATH+'css/app.css'
            },
            js: {
                src: [
                    DEV_PATH+'js/libs/jquery-3.1.1.min.js',
                    DEV_PATH+'js/libs/preloadjs-0.6.2.min.js',
                    DEV_PATH+'js/libs/physicsjs-full.min.js',
                    DEV_PATH+'js/libs/handlebars.runtime-v4.0.5.js',
                    DEV_PATH+'js/libs/Chart.min.js',
                    DEV_PATH+'js/libs/webfontloader.js',
                    DEV_PATH+'js/libs/phaser.js',
                    DEV_PATH+'js/libs/displacement.js',
                    DEV_PATH+'js/helpers/*.js',
                    DEV_PATH+'js/libs/bezier.js',
                    DEV_PATH+'js/game/*.js',
                    DEV_PATH+'js/templates.js',
                    DEV_PATH+'js/build.js'
                ],
                dest: DIST_PATH+'js/all.js'
            }
        },

        uglify: {
            site: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    preserveComments: 'some'
                },
                files: {
                    'www/js/all.min.js': [DIST_PATH + 'js/all.js']
                }
            }
        },
        
        jshint: {
            files: [DEV_PATH+'js/*.js']
        },

        jsonlint: {
            dev: {
                src: [ 'www/json/*.json' ],
                options: {
                    formatter: 'prose',
                    format: true,
                    indent: 4
                }
            }
        },
        
        watch: {
            files: [DEV_PATH+'sass/*.scss', DEV_PATH+'js/*.js'],
            tasks: ['compass', 'concat:js', 'concat:css'],
            options: {
                debounceDelay: 250
            }
        }
    });

    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsonlint');


    grunt.registerTask('dev', [
        'watch'
    ]);
    
    
    grunt.registerTask('default', [
        'compass:desktop',
        'handlebars',
        'browserify',
        'concat:js',
        'concat:css',
        'cssmin'
    ]);
    
    grunt.registerTask('build', [
        'sprite:desktop',
        'concat:sass',
        'compass:desktop',
        'concat:js',
        'concat:css',
        'copy:assets',
        'imagemin'
    ]);
    
};