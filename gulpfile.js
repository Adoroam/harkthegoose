var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var connect = require('gulp-connect');
var es = require('event-stream');

//complite typescript and merge javascript to dist/all.min.js
gulp.task('scripts', function() {
    var ts = gulp.src('src/ts/*.ts')
    .pipe(typescript());
    var js = gulp.src('src/js/*.js');

    return es.merge(ts, js)
    .pipe(concat('all.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist'));

});
//concat all css in src/css dist/style.css
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist'));    
});
//run server on localhost and enable automatic refresh
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 80,
        livereload: true
    });
});
gulp.task('html', function() {
    gulp.src('dist/index.html')
    .pipe(connect.reload());
});
//watch for changes in the index.html, templates, or any src folder
//then run the js and css tasks and reload the server
gulp.task('watch', function() {
    gulp.watch(['dist/*.html', 'dist/templates/*', 'src/**/*'], ['scripts', 'css', 'html']);
});
//this runs all the tasks when you type gulp
gulp.task('default', ['scripts', 'css', 'connect', 'watch']);

/*
error handler to check broken pieces
attach .on('error', errorHandler) to broken piece
function errorHandler (error) {
  console.log(error.toString()); this.emit('end');};
*/