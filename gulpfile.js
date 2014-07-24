var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('clean', function() {
  rimraf.sync('www/js/main*.js')
});

gulp.task('concat', function () {
  gulp.src(['www/js/**/module.js', 'www/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('www/js'))
});

gulp.task('compress', function() {
  gulp.src(['www/js/**/module.js', 'www/js/**/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'))
});

gulp.task('lint', function() {
  gulp.src('www/js/main.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('default', ['clean', 'concat', 'lint', 'compress']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// Ionic

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
