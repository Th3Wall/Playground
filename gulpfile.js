'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', async function () {
    gulp.src('styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream())
});

gulp.task('browserSync', async function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('watch', gulp.parallel('browserSync', 'sass'), function () {
    gulp.watch('styles/scss/**/*.scss', gulp.series('sass'));
});