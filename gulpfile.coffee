gulp = require 'gulp'
coffee = require 'gulp-coffee'
clean = require 'gulp-clean'
concat = require 'gulp-concat'

gulp.task 'clean', () ->

  gulp.src './dist'
  .pipe clean()

gulp.task 'coffee', ['clean'], () ->

  gulp.src [
    './src/**'
    './url.config.coffee'
  ]
  .pipe coffee()
  .pipe concat 'index.js'
  .pipe gulp.dest './dist'

gulp.task 'default', ['coffee']
