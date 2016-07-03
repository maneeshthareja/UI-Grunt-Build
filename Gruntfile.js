module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist/*.js', 'test/testem.tap'],
    jshint: {
      all: ['src/*.js'],
      options: grunt.file.readJSON('.jshintrc')
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
                path: 'dist/testresults/.test'
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

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'testem', 'clean', 'qunit-cov']);
  grunt.registerTask('jenkins', ['jshint', 'clean', 'jasmine', 'plato', 'concat', 'uglify']);
};