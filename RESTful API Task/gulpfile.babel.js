'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import del from 'del';

const sassPaths = {
    src: './src/scss/**/*.scss',
    dest: './dist/styles/'
}

const jsPaths = {
    src: './src/js/**/*.js',
    dest: './dist/scripts/'
}

const imgPaths = {
    src: './src/img/**/*',
    dest: './dist/images/'
}

gulp.task('styles', () => {
    return gulp.src(sassPaths.src)
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: false
        }))
        .pipe(gulp.dest(sassPaths.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () => {
    return gulp.src(jsPaths.src)
        .pipe(concat('index.js'))
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('browser-sync', () => {
   var files = [
      './**/*.html',
      jsPaths.src,
      sassPaths.src
   ];

   browserSync.init(files, {
      server: {
         baseDir: './dist/'
      }
   });
});

gulp.task('img', () => {
    return gulp.src(imgPaths.src)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(imgPaths.dest));
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'img', 'watch'], () => {
    var buildAssets = gulp.src('./assets/**/*')
        .pipe(gulp.dest('./dist/assets/'));

    var buildHtml = gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});


gulp.task('clean-dist', () => {
    return del.sync('./dist/');
});

gulp.task('clear-cache', () => {
    return cache.clearAll();
});

gulp.task('watch', () => {
    gulp.watch(sassPaths.src, ['styles']);
    gulp.watch('./src/*.html', browserSync.reload);
    gulp.watch(jsPaths.src, ['scripts'], browserSync.reload);
});