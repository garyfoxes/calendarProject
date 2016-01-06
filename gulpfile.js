var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');

gulp.task('css', function() {
    gulp.src('css/calenderStyle.css')
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('compress-js', function() {
    gulp.src('unminifiedjs/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
    gulp.src('calenderStyle.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));

});

gulp.task('default', function() {
    gulp.run('sass', 'compress-js');
    gulp.watch('calenderStyle.scss', ['sass']);
    gulp.watch('css/calenderStyle.css', ['css']);
    gulp.watch('unminifiedjs/*.js', ['compress-js']);
});
