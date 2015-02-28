/**
 * Init vars
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var react = require('gulp-react');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var appDir = 'app', testDir = 'test';

gulp.task('jsHint', function() {
    return gulp.src(appDir + '/scripts')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('jsxTransform', function () {
    return gulp.src('./app/scripts/views/**/*.js')
        .pipe(react())
        .pipe(gulp.dest(testDir + '/views'));
});

gulp.task('test', ['jsHint', 'jsxTransform'], function() {
    // Be sure to return the stream
    return gulp.src([
        'test/**/*.js'
    ])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});