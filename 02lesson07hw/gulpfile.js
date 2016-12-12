var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpUseRef = require('gulp-useref');
var gulpJade = require('gulp-jade');
var browserSync = require('browser-sync');

gulp.task('browserSync',function(){
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('jade',function(){
    gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

