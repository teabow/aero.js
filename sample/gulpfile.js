/**
 *
 *  Gulp file
 *
 **/


/**
 * Init vars
 */
var gulp = require('gulp');
var fs = require('fs');
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
gulp.task('server', ['copyAero'], function () {
    gulp.start('connect');
    gulp.start('watch');
});

gulp.task('copyAero', function () {
    fs.createReadStream('../src/aero.js').pipe(fs.createWriteStream('app/lib/aero.js'));
});
