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
var appDir = 'app',
    vendorDir = 'bower_components';


gulp.task('watch', function () {
    gulp.watch([
        appDir + '/**/*.html',
        appDir + '/**/*.js',
        appDir + '/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
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
gulp.task('server', function () {
    gulp.start('connect');
    gulp.start('watch');
});
