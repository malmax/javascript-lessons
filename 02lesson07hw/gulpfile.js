var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpUseRef = require('gulp-useref');
var gulpJade = require('gulp-jade');
var uglify = require('gulp-uglify');
// var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');

var browserSync = require('browser-sync');

gulp.task('browserSync',function(){
    browserSync({
        server: {
            baseDir: 'app/dist'
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


gulp.task('useref',['jade'], function() {
  return gulp.src('app/dist/*.html')
   .pipe(gulpUseRef())
   .pipe(gulpIf('*.js', uglify())) 
   .pipe(gulpIf('*.css', minifyCss()))
   .pipe(gulp.dest('app/dist'))
})


gulp.task('watch',['browserSync','useref'],function(){
    gulp.watch('app/src/html/*.jade',['useref']);
    gulp.watch('app/src/js/*.js',['useref']);
    gulp.watch('app/dist/*.html', browserSync.reload);
    gulp.watch('app/dist/js/*.js', browserSync.reload);
});

