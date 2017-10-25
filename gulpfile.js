const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('serve', ['sass'], () => {

    browserSync.init({
        server: './'
    });

    gulp.watch('css/scss/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp
        .src('css/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
