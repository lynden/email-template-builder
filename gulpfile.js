var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inlineCss = require('gulp-inline-css');

var src = ".src/";
var dest = ".production/";

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


// Watch Scss
gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/html/**/*.html', ['inline-css']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'images']);