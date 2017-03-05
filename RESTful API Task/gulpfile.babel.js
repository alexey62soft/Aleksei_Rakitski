'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import es6Promise from 'es6-promise';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import source from 'vinyl-source-stream';
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
    src: './src/**/*.js',
    dest: './dist/scripts/'
}

const imgPaths = {
    src: './src/img/**/*',
    dest: './dist/images/'
}

gulp.task('styles', () => {
    return gulp.src(sassPaths.src)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: false
        }))
        .pipe(gulp.dest(sassPaths.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () => {
    return browserify({
        entries: ['./src/js/loader.es6.js']
    })
    .transform(babelify)
    .bundle()
    .pipe(source("loader.js"))
    .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('browser-sync', () => {
   let files = [
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

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('lib', () => {
    return gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./dist/lib/'));
});

gulp.task('components-scripts', () => {
    return browserify({
        entries: ['./src/components/js/event-component.es6.js']
    })
    .transform(babelify)
    .bundle()
    .pipe(source("event-component.js"))
    .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('components-html', () => {
    return gulp.src('./src/components/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'img', 'html', 'lib', 'components-scripts', 'components-html', 'watch'], () => {
    let buildAssets = gulp.src('./assets/**/*')
        .pipe(gulp.dest('./dist/assets/'));
		
	es6Promise.polyfill();
});


gulp.task('clean-dist', () => {
    return del.sync('./dist/');
});

gulp.task('clear-cache', () => {
    return cache.clearAll();
});

gulp.task('watch', () => {
    gulp.watch(sassPaths.src, ['styles']);
    gulp.watch('./src/*.html', ['html'], browserSync.reload);
    gulp.watch('./src/components/*.html', ['components-html'], browserSync.reload);
    gulp.watch('./src/lib/**/*', ['lib'], browserSync.reload);
    gulp.watch(jsPaths.src, ['scripts', 'components-scripts'], browserSync.reload);
});