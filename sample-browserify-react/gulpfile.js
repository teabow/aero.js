/**
 *
 *  Gulp file
 *
 **/


/**
 * Init vars
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var appDir = 'app';


gulp.task('watch', function () {
    gulp.watch([
        appDir + '/**/*.html',
        appDir + '/scripts/**/*.js',
        appDir + '/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch([appDir + '/scripts/**/*.js'], ['browserify']);
});

gulp.task('connect', plugins.connect.server({
    root: [appDir],
    port: 9000,
    livereload: true
}));

/**
 * Runs localhost server with non compiled files
 * @return {void}
 */
gulp.task('server', ['browserify'], function () {
    gulp.start('connect');
    gulp.start('watch');
});

gulp.task('browserify', function () {
    return browserify({debug: false})
        .add('./' + appDir + '/scripts/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(appDir));
});
