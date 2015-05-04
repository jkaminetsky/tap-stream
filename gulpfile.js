'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

/** Lint JS */
gulp.task('test', function () {
    var srcToLint = ['**/*.js', '!node_modules/**/*'];

    return gulp
        .src(srcToLint)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
