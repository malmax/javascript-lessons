var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpUseRef = require('gulp-useref');
var gulpJade = require('gulp-jade');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var babel = require('gulp-babel');

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
        .pipe(gulpJade({pretty: true}))
        .pipe(gulp.dest('app/dist'))
        // .pipe(browserSync.reload({
        //     stream: true
        // }))
});

gulp.task('html', function() {
  return gulp.src('app/dist/*.html')
   .pipe(gulpUseRef())
   .pipe(gulpIf('*.js', babel({ presets: ['es2015'] }))) // почему-то не работает =((
   .pipe(gulpIf('*.css', minifyCss()))
   .pipe(gulp.dest('app/dist'))
//    .pipe(browserSync.reload({
//             stream: true
//         }))
});

gulp.task('watch',['html','browserSync','jade'],function(){
    gulp.watch('app/src/html/*.jade',['html','jade']);
    gulp.watch('app/src/js/*.js',['html','jade']);
    gulp.watch('app/dist/*.html', browserSync.reload);
    gulp.watch('app/dist/js/*.js', browserSync.reload);
});

