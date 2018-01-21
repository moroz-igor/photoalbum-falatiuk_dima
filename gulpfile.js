'use strict';
/** gulp connection **/
var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    /** connection of gulp plugins **/
    browserSync = require('browser-sync').create();
/** automatic  reloader of the browser **/
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});
/** pug plugins **/
gulp.task('pug', function() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(gp.plumber())
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload);
});
/** sass plugins b**/
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.plumber())
        .pipe(gp.sass().on('error', gp.sass.logError))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))
        .on("error", gp.notify.onError({
            title: "style"
        }))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** connection of the js libs **/
gulp.task('scripts_lib', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gp.concat('libs.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** connection of the js files **/
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** watcher for all files **/
gulp.task('watch', function() {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/scripts/**/*.js', gulp.series('scripts'))
});
/** parallel connection of difrent tasks **/
gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass', 'scripts_lib', 'scripts'),
    gulp.parallel('watch', 'serve')
));