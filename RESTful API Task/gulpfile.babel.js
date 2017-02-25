'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

const sassPaths = {
    src: './src/scss/**/*.scss',
    dest: './dist/styles/'
}

const jsPaths = {
    src: './src/js/**/*.js',
    dest: './dist/scripts/'
}

gulp.task('styles', () => {
    return gulp.src(sassPaths.src)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(sassPaths.dest))
        .pipe(sass.sync().on('error', plugins.sass.logError))
        .pipe(gulp.dest(sassPaths.dest));
});

gulp.task('scripts', () => {
    return gulp.src(jsPaths.src)
        .pipe(concat('index.js'))
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('browser-sync', function () {
   var files = [
      './**/*.html',
      jsPaths.src,
      sassPaths.src
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

gulp.task('default', ['styles', 'scripts', 'watch']);

gulp.task('watch', () => {
    gulp.watch(sassPaths.src, ['styles']);
    gulp.watch(jsPaths.src, ['scripts']);
});