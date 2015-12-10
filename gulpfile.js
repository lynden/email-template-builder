var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    inlineCss   = require('gulp-inline-css')
    browserSync = require('browser-sync').create();

// Compile Sass
gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

// Inline CSS
gulp.task('inline-css', function() {
    return gulp.src('./src/html/**/*.html')
        .pipe(inlineCss({
            applyStyleTags: false,
            removeStyleTags: false
        }))
        .pipe(gulp.dest('./production/html'));
});

// Browsersync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./production/html/"
        }
    });
});

// Watch Scss
gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/html/**/*.html', ['inline-css']);
});

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./production/html/"
    });

    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/html/**/*.html', ['inline-css']);
    gulp.watch("./production/**/*.html").on('change', browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve']);
