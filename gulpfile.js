'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./styles/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./styles'))
        .pipe(browserSync.stream());

}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./styles/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

// var config = {
//     server: {
//         baseDir: './'
//     },
//     files: [
//         './styles/scss/**/*.scss'
//     ]
// };

// gulp.task('sass', async function () {
//     gulp.src('styles/scss/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./dist/styles'))
//         .pipe(browserSync.stream())
// });

// gulp.task('browserSync', function () {
//     browserSync.init(config);
// });

// gulp.task('reload', function (done) {
//     browserSync.reload();
//     done();
// });

// gulp.task('watch', gulp.parallel('browserSync', 'sass'), function () {
//     gulp.watch('styles/scss/**/*.scss', gulp.series('sass', 'reload'));
// });