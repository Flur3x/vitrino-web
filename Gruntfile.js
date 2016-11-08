module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ESLINT
    eslint: {
      options: {
        configFile: ".eslintrc"
      },
      target: ['Gruntfile.js', 'app.js', 'routes.js', '.jshintrc', 'server/**/*.js', 'test/**/*.js']
    },

    // MOCHA
    mochaTest: {
      options: {
        reporter: 'spec',
        quiet: false,
        clearRequireCache: false
      },
      test: {
        src: ['test/*.js']
      },
      'test-it': {
        src: ['test/integration/**/*.js']
      }
    },

    // LESS
    less: {
      build: {
        options: {
          paths: ['client/stylesheets/core', 'client/stylesheets/custom']
        },
        files: {
            'public/css/vitrino.css': 'client/stylesheets/vitrino.less'
        }
      }
    },

    // POSTCSS
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: '> 0% in DE'}) // add vendor prefixes
        ]
      },
      dist: {
        src: 'public/css/vitrino.css'
      }
    },

    // CSSMIN
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
    },
    build: {
      files: {
        'public/css/vitrino.min.css': 'public/css/vitrino.css'
      }
      }
    },

    // WATCH
    watch: {
      files: ['<%= eslint.target %>', 'client/stylesheets/**/*.less'],
      tasks: ['build', 'eslint']
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['less', 'postcss', 'cssmin']);
  grunt.registerTask('test', ['eslint', 'mochaTest:test']);
  grunt.registerTask('test-it', ['mochaTest:test-it']);
  grunt.registerTask('default', ['build', 'test', 'watch']);
};