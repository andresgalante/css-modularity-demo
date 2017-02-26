var gulp = require('gulp'),
 sass = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 browserSync = require('browser-sync'),
 reload = browserSync.reload;

// JavaScript
gulp.task('scripts', function(){
  gulp.src('**/js/*.js')
    .pipe(reload({stream:true}));
});

// Styles
gulp.task('styles', function(){
  gulp.src('**/css/*.css')
    .pipe(reload({stream:true}));
});

// Sass compile
gulp.task('sass', function() {
      gulp.src('masthead/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('masthead/css/'))
        .pipe(reload({stream:true}));
});


// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watch for changes on files
gulp.task('watch', function(){
  gulp.watch('masthead/sass/**/*.scss',['sass']);
  gulp.watch('**/js/*.js', ['scripts']);
  gulp.watch('**/css/*.css', ['styles']);
  gulp.watch("**/*.html", ['bs-reload']);
});

// deploys
gulp.task('default',  ['scripts','styles','sass','browser-sync','watch']);
