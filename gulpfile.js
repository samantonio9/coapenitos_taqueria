/*jshint esversion: 6 */
/* jshint node: true */

'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const kraken = require('gulp-kraken');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const closureCompiler = require('google-closure-compiler').gulp();
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();



gulp.task('stylus', function() {
	var plugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src(['assets/*.styl', '!assets/und*.styl'])
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(stylus({
		use: nib(),
		'include css': true
	}))
	.pipe(rename('main.min.css'))
	.pipe(postcss(plugins))
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});


gulp.task('plugins', function(cb){
	gulp.src([
		'./assets/**/*.js',
		'!assets/*.min.js',
		'./assets/main.js'])
	.pipe(plumber())
	.pipe(concat('plugins.js'))
	.pipe(plumber.stop())
	.pipe(gulp.dest('./js'))
	gulp.start('scripts')
	cb();
});

gulp.task('scripts', ['plugins'],  function() {
	gulp.src(['./js/plugins.js'])
	.pipe(plumber())
	.pipe(sourcemaps.init())
	/*.pipe(concat('all.js'))*/
	.pipe(closureCompiler({
		compilation_level: 'SIMPLE_OPTIMIZATIONS',
		js_output_file: 'main.min.js'
	}))
	/*.pipe(rename('main.min.js'))*/
	.pipe(sourcemaps.write())
	.pipe(plumber.stop())
	.pipe(gulp.dest('./js'))
	browserSync.reload();
});


gulp.task('kraken', function () {
    gulp.src('img/**/*.{jpg,png,svg}')
		.pipe(plumber())
		.pipe(kraken({
			key: '06304f296cf4ea6454b060e73dc14b03',
			secret: '50bda3db4269dd9a85c98a32fa2e41f3bd3ed788',
			lossy: true,
			concurrency: 6
		}))
		.pipe(plumber.stop());
});


gulp.task('images', function () {
    gulp.src('img/**/*.{jpg,png,gif,svg}')
	.pipe(plumber())
	.pipe(imagemin([
	    imagemin.gifsicle({interlaced: true}),
	    imagemin.jpegtran({progressive: true}),
	    imagemin.optipng({optimizationLevel: 7}),
	    imagemin.svgo({plugins: [{removeViewBox: true}]})
	], {
    verbose: true
	}))
	.pipe(plumber.stop());
});

gulp.task('watch', function() {
	gulp.watch("./assets/*.js", ['plugins']);
	gulp.watch(["./views/**/*.twig", "./**/*.php"]).on('change', browserSync.reload);
	gulp.watch("assets/*.styl", ['stylus']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8888"
    });
});



gulp.task('default', ['stylus', 'plugins', 'watch', 'browser-sync']);
