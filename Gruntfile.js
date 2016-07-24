module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist/*.js', 'test/testem.tap'],
	jshint: {
	  all: {
        src: [
          'src/*.js'
        ]
      },
      options: {
		jshintrc:'.jshintrc',
		reporter: require('jshint-html-reporter'),
        reporterOutput: 'dist/jshintreport/jshint-report.html'
	  },
    },
    jscs: {
      all: {
        src: [
          'src/*.js'
        ]
      },
      options: {
        config: '.jscsrc',
        reporter: require('jscs-html-reporter').path,
        reporterOutput: 'dist/jshintreport/jscs-report.html'
      },
      test: {
        src: ['spec/{,*/}*.js']
      }
    },
    concat: {
      build: {
        files: {
          'dist/<%= pkg.name %>.js': [
            'src/superb.js',
            'src/impressive.js',
			'src/Player.js',
			'src/Song.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine : {
      src : 'src/**/*.js',
      options : {
        specs : 'spec/**/*.js',
		junit: {
            path: 'dist/testresults'
        }
      },
	  istanbul: {
        src: 'src/**/*.js',
        options: {
            specs: 'spec/**/*.js',
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: 'dist/coverage/coverage.json',
                report: [
                    {type: 'lcov', options: {dir: 'dist/coverage'}},
                    {type: 'html', options: {dir: 'dist/coverage'}},
                    {type: 'cobertura', options: {dir: 'dist/coverage/cobertura'}},
                    {type: 'text-summary'}
                ]
				}
			}
		}
    },
    plato: {
      options: {
        title: 'UI Project',
        jshint: grunt.file.readJSON('.jshintrc')
      },
      metrics: {
        files: {
          'dist/metrics': [ 'src/*.js' ]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-template-jasmine-istanbul');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'testem', 'clean', 'qunit-cov']);
  grunt.registerTask('coverage', ['jasmine:istanbul']);
  grunt.registerTask('jenkins', ['clean','jscs', 'jshint', 'jasmine', 'plato', 'concat', 'uglify']);
};