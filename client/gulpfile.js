var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-template');
var header = require('gulp-header');
var htmlmin = require('gulp-htmlmin');

var merge = require('merge-stream');
var rimraf = require('rimraf');
var _ = require('lodash');

var package = require('./package.json');


/***** Task: Build Index *****/
gulp.task('build-index', function () {
  return gulp.src('src/index.html')
    .pipe(template({
      pkg: package,
      year: new Date()
    }))
    .pipe(gulp.dest('dist'));
});

/***** Task: Build JS *****/
gulp.task('build-js', function () {
  var now = new Date();

  var htmlMinOpts = {
    collapseWhitespace: true,
    conservativeCollapse: true
  };

  return merge(
      gulp.src('src/**/*.js'),
      gulp.src('src/app/**/*.tpl.html')
          .pipe(htmlmin(htmlMinOpts))
          .pipe(templateCache({
            standalone: true,
            module: 'templates.app'
          })),
      gulp.src('src/common/**/*.tpl.html')
          .pipe(htmlmin(htmlMinOpts))
          .pipe(templateCache({
            standalone: true,
            module: 'templates.common'
          }))
    )
    .pipe(concat(package.name + '.js'))
    // .pipe(uglify(package.name + '.js', {
    //   mangle: false
    // }))
    .pipe(header(
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= buildDate %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= copyrightYear %> <%= pkg.author %>;\n' +
        ' * Licensed <%= pkg.licenses[0].type %>\n */\n',
      {
        pkg: package,
        buildDate: now,
        copyrightYear: now.getFullYear()
      }))
    .pipe(gulp.dest('dist'));
});

/***** Task: Copy Static *****/
gulp.task('copy-static', function () {
  return merge(
    gulp.src('vendor/bootstrap-css/css/*.css').pipe(gulp.dest('dist/css')),
    gulp.src('vendor/bootstrap-css/fonts/*').pipe(gulp.dest('dist/fonts')),
    merge(
      gulp.src('src/assets/**/*.*'),
      gulp.src([
          'vendor/angular/angular.js',
          'vendor/angular-route/angular-route.js'
        ])
        .pipe(concat('angular.js')),
      gulp.src('vendor/angular-bootstrap/ui-bootstrap-tpls.js'),
      gulp.src('vendor/jquery/dist/jquery.js'),
      gulp.src('vendor/angularjs-mongolab/src/*.js')
    ).pipe(gulp.dest('dist'))
  );
});

/***** Task: Clean *****/
gulp.task('clean', function (done) {
  return rimraf('dist', done);
});

/***** Task: Lint *****/
gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', 'test/unit/**/*.js']).pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/***** Task: Watch *****/
gulp.task('watch', ['lint', 'build'], function () {
  gulp.watch('src/**/*.js', ['lint', 'build-js']);
  gulp.watch('src/**/*.tpl.html', ['build-js']);
  gulp.watch('src/index.html', ['build-index']);
  gulp.watch('src/assets/**/*.*', ['copy-static']);
});

/***** Task: Build *****/
gulp.task('build', [
  'copy-static',
  'build-index',
  'build-js'
]);

/***** Task: Default *****/
gulp.task('default', [
  'lint',
  'test',
  'build'
]);

/*
TODO:
- watch shouldn't break on errors
- don't uglify / HTML minifiy during watch
- live-reload
 */
