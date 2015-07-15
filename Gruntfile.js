module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine'],
                  browsers: ['Chrome'],
                  port: 9876,
                  autoWatch: true,
                  files: [
                  'node_modules/angular/angular.js',
                  'node_modules/angular-pusher/angular-pusher.js',
                  'node_modules/angular-aria/angular-aria.js',
                  'node_modules/angular-animate/angular-animate.js',
                  'node_modules/angular-material/angular-material.js',
                  'node_modules/angular-mocks/angular-mocks.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/angular-material-icons/0.5.0/angular-material-icons.min.js',
                  'https://cdn.rawgit.com/Luegg/angularjs-scroll-glue/master/src/scrollglue.js',
                  'public/app/app.module.js',
                  'public/app/app.constants.js',
                  'public/app/**/*.js',
                  'public/tests/*.js'
                  ]
      },
      unit: {
        singleRun: true
      },
      continuous: {
        // keep karma running in the background
        background: true
      }
    },
    watch: {
      karma: {
        // run these tasks when these files change
        files: ['public/app/**/*.js', 'public/tests/**/*.js'],
        tasks: ['karma:continuous:run'] // note the :run flag
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
};