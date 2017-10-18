// Generated on 2014-12-05 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //grunt replace to replace configuration
    grunt.loadNpmTasks('grunt-replace');

    // Configurable paths for the application
    var bower = require('./bower.json');
    var appConfig = {
        app: bower.appPath || 'app',
        dist: 'dist'
    };

    var languages = ['en'],
        langObj = {};

    for (var i = 0; i < languages.length; i++) {
        langObj[appConfig.app + '/languages/' + languages[i] + '.json'] = [
		appConfig.app + '/languages/' + languages[i] + '/buttons.json',
		appConfig.app + '/languages/' + languages[i] + '/placeholders.json',
		appConfig.app + '/languages/' + languages[i] + '/mastheads.json',
		appConfig.app + '/languages/' + languages[i] + '/labels.json'
	]
    }
    grunt.loadNpmTasks('grunt-cache-breaker');

    // enable version bump
    grunt.loadNpmTasks('grunt-bump');

    // Define the configuration for all the tasks
    grunt.initConfig({
        cachebreaker: {
            dev: {
                options: {
                    match: ['app.js',
                        'scripts.js',
                        'vendor.js',
                        'templates.js',
                        'frameVendor.js',
                        'main.css',
                        'vendor.css']
                },
                files: {
                    src: ['<%= yeoman.dist %>/index.html','<%= yeoman.dist %>/frameRedirect.html']
                }
            }
        },
        // version bump on package.json,bower.json
        bump: {
            options: {
              files: ['package.json','bower.json'],
              updateConfigs: [],
              commit: false,
              commitMessage: 'Release v%VERSION%',
              commitFiles: ['package.json','bower.json'],
              createTag: true,
              tagName: 'v%VERSION%',
              tagMessage: 'Version %VERSION%',
              push: false,
              pushTo: 'upstream',
              gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
              globalReplace: false,
              prereleaseName: false,
              metadata: '',
              regExp: false
            }
          },
        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/{,*//*}*.less'],
                tasks: ['less:dev']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
          '.tmp/styles/*.css',
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.app %>/modules/**/{,*/}*.js'
        ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 7095,
                // Change this to '0.0.0.0' to access the server from outside.
                //hostname: '0.0.0.0',
                hostname: 'localhost',
                livereload: 35712
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
              connect.static('.tmp'),
              connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
                    }
                }
            },
            test: {
                options: {
                    port: 9013,
                    middleware: function (connect) {
                        return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/**/{,*}*.js'
        ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapRootpath: '..',
                    sourceMapBasepath: 'base',
                    sourceMapURL: 'url'
                },
                files: {
                    '.tmp/styles/main.css': ['<%= yeoman.app %>/modules/app.less']
                }
            },
            dist: {
                options: {
                    compress: true,
                    cleancss: true,
                    optimization: 2
                },
                files: {
                    '.tmp/styles/main.css': '<%= yeoman.app %>/modules/app.less'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
        }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                exclude: [
                  'bower_components/bootstrap/dist/js/bootstrap.js',
                  'bower_components/bootstrap/dist/css/bootstrap.css',
                  'bower_components/fontawesome/css/font-awesome.css',
                  'bower_components/font-awesome/css/font-awesome.css',
				  'bower_components/ngTinyScrollbar/dist/ng-tiny-scrollbar.min.css',
                  'bower_components/angular-datatables/dist/plugins/colreorder/datatables.colreorder.js',
                  'bower_components/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.min.js',
              ],
                ignorePath: /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
          '<%= yeoman.dist %>/mockData/{,*/}*.json',
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.app %>/index.html','<%= yeoman.app %>/frameRedirect.html'],
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglify'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        //cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        //},
        /*uglify: {
           options: {
              mangle: {
                except: ['angular']
              }
            }
        },*/
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
        }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
        }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['<%= yeoman.app %>/**/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
        }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '<%= yeoman.dist %>/scripts'
        }]
            }
        },

        ngtemplates: {
            app: {
                cwd: '<%= yeoman.app %>',
                src: [
          'modules/**/*.html'
        ],
                dest: '<%= yeoman.dist %>/scripts/templates.js',
                options: {
                    module: 'selfServiceApp'
                }
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '**/{,*/}*.html',
            'images/{,*/}*.*',
            'js/getConfiguration.js',
            'fonts/**',
            'languages/{,*/}*.*',
            'jsonData/*.*'
          ]
        },{
                expand: true,
                cwd: './bower_components/gsd/dist/directives',
                dest: '<%= yeoman.dist %>/modules/gsd/views',
                src: ['*.html']
        },{
                expand: true,
                    cwd: './bower_components/gsd/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: '*.*'
        }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
        }, {
                        expand: true,
                        cwd: '.tmp/fonts',
                        dest: '<%= yeoman.dist %>/fonts',
                        src: ['bower_components/font-awesome/fonts/*.*']
        },
                    {
                        expand: true,
                        cwd: 'app/js/kendo-ui/styles/',
                        src: ['**'],
                        dest: '<%= yeoman.dist %>/js/kendo-ui/styles/'
        },

                    {
                        expand: true,
                        cwd: 'bower_components/video.js/dist/video-js/font/',
                        src: ['**'],
                        dest: '<%= yeoman.dist %>/fonts/'
        },
                    {

                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= yeoman.dist %>'
        }
        ]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    dest: '.tmp/styles/',
                    src: '{,*/}*.css'
        }, {
                    expand: true,
                    cwd: './bower_components/bootstrap/fonts',
                    dest: '<%= yeoman.app %>/fonts/',
                    src: '*.*'
        }, {
                    expand: true,
                    cwd: './bower_components/video.js/src/css/font',
                    dest: '<%= yeoman.app %>/fonts/',
                    src: '*.*'
        },{
                        expand: true,
                        cwd: '.tmp/fonts',
                        dest: '<%= yeoman.dist %>/fonts',
                        src: ['bower_components/font-awesome/fonts/*.*']
        }]
            },
            dev:
            {
                files: [{
                    expand: true,
                        cwd: './bower_components/gsd/images',
                        dest: '<%= yeoman.app %>/images',
                        src: '*.*'
        },{
                    expand: true,
                    cwd: './bower_components/gsd/dist/directives',
                    dest: '<%= yeoman.app %>/modules/gsd/views',
                    src: ['*.html']
                }]

        }
        },

        extend: {
            options: {
                defaults: {}
            }
            /*,allEnvironments: {
              //files: langObj
            }*/
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
        'copy:styles',
        'copy:dev'
      ],
            test: [
        'copy:styles',
        'copy:dev'
      ],
            dist: [
        'copy:styles',
        //'imagemin', //Issue with this one on my local environment
        'svgmin'
      ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        replace: {
            development: {
              options: {
                patterns: [{
                  json: grunt.file.readJSON('./config/environments/development.json')
                }]
              },
              files: [{
                expand: true,
                flatten: true,
                src: ['./config/config.js'],
                dest: '<%= yeoman.app %>/modules/'
              }, {
                src: ['./config/headerDetails.json'],
                dest: '<%= yeoman.app %>/jsonData/headerDetails.json'
              },{
                src: ['<%= yeoman.app %>/indexGrunt.html'],
                dest: '<%= yeoman.app %>/index.html'
              }]
            },QA: {
              options: {
                patterns: [{
                  json: grunt.file.readJSON('./config/environments/QA.json')
                }]
              },
              files: [{
                expand: true,
                flatten: true,
                src: ['./config/config.js'],
                dest: '<%= yeoman.app %>/modules/'
              }, {
                src: ['./config/headerDetails.json'],
                dest: '<%= yeoman.app %>/jsonData/headerDetails.json'
             },{
                src: ['<%= yeoman.app %>/indexGrunt.html'],
                dest: '<%= yeoman.app %>/index.html'
              }]
            },Staging: {
              options: {
                patterns: [{
                  json: grunt.file.readJSON('./config/environments/Staging.json')
                }]
              },
              files: [{
                expand: true,
                flatten: true,
                src: ['./config/config.js'],
                dest: '<%= yeoman.app %>/modules/'
              }, {
                src: ['./config/headerDetails.json'],
                dest: '<%= yeoman.app %>/jsonData/headerDetails.json'
              },{
                src: ['<%= yeoman.app %>/indexGrunt.html'],
                dest: '<%= yeoman.app %>/index.html'
              }]
            },Staging_PROD: {
              options: {
                patterns: [{
                  json: grunt.file.readJSON('./config/environments/Staging_PROD.json')
                }]
              },
              files: [{
                expand: true,
                flatten: true,
                src: ['./config/config.js'],
                dest: '<%= yeoman.app %>/modules/'
              }, {
                src: ['./config/headerDetails.json'],
                dest: '<%= yeoman.app %>/jsonData/headerDetails.json'
              },{
                src: ['<%= yeoman.app %>/indexGrunt.html'],
                dest: '<%= yeoman.app %>/index.html'
              }]
            },PROD: {
              options: {
                patterns: [{
                  json: grunt.file.readJSON('./config/environments/PROD.json')
                }]
              },
              files: [{
                expand: true,
                flatten: true,
                src: ['./config/config.js'],
                dest: '<%= yeoman.app %>/modules/'
              }, {
                src: ['./config/headerDetails.json'],
                dest: '<%= yeoman.app %>/jsonData/headerDetails.json'
              },{
                src: ['<%= yeoman.app %>/indexGrunt.html'],
                dest: '<%= yeoman.app %>/index.html'
              }]
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target,env) {
        if(env == undefined)
            env = 'development';
        if (target === 'dist') {
            return grunt.task.run(['build:'+env, 'connect:dist:keepalive']);
        }
        grunt.task.run([
      'replace:'+env,
      'clean:server',
      'wiredep',
      'less:dev',
      'concurrent:server',
      'postcss',
      'ngtemplates',
      'extend',
      'connect:livereload',
      'watch'
    ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'postcss',
    'karma',
    'connect:test'
  ]);

    grunt.registerTask('build',function (target) {
        if (target === undefined) {
          // if not target is specified, development settings are applied
          grunt.task.run(['replace:development']);
        }
        else {
          // if target specified by user is applied
          grunt.task.run(['replace:'+target]);
        }
        grunt.task.run([
        'clean:dist',
        'wiredep',
        'less:dev',
        'useminPrepare',
        /*'concurrent:dist',*/
        'concat',
        'ngtemplates',
        'ngAnnotate',
        'uglify',
        'copy',
        /*'cdnify',*/
        'cssmin',
        'usemin',
        'postcss',
        'cachebreaker:dev'
        /*'extend'*/

      ]);
    });
    grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
