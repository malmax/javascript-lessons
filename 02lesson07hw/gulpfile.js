var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpUseRef = require('gulp-useref');
var gulpJade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var browserSync = require('browser-sync');

gulp.task('browserSync',function(){
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('jade',function(){
    gulp.src('app/src/html/**/*.jade')
        .pipe(gulpJade())
        .pipe(gulp.dest('app/dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js',function(){
    return gulp.src('app/src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', function() {

});

