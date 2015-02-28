/**
 * Init vars
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var appDir = 'app', testDir = 'test',
    serverDir = '.tmp', buildDir = 'build';

gulp.task('watch', function () {
    gulp.watch([
        appDir + '/**/*.html',
        appDir + '/scripts/**/*.js',
        appDir + '/**/*.scss'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch([appDir + '/scripts/**/*.js'], ['browserify']);
    gulp.watch([appDir + '**/*.scss'], ['sass']);
    gulp.watch([appDir + '**/*.html'], ['html']);
});

gulp.task('connect', plugins.connect.server({
    root: [serverDir],
    port: 9000,
    livereload: true
}));

gulp.task('server', ['html', 'sass', 'browserify'], function () {
    gulp.start('connect');
    gulp.start('watch');
});

gulp.task('html', function () {
    gulp.src(appDir + '**/*.html', { base: appDir })
        .pipe(gulp.dest(serverDir));
});

gulp.task('sass', function () {
    gulp.src(appDir + '**/*.scss', { base: appDir })
        .pipe(sass())
        .pipe(gulp.dest(serverDir));
});

gulp.task('browserify', function () {
    return browserify({debug: false})
        .add('./' + appDir + '/scripts/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(serverDir));
});