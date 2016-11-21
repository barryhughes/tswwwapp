var gulp    = require('gulp');
var rename  = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var typescript = require('gulp-typescript');
var uglify     = require('gulp-uglify');
var browserify = require('browserify');

var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var nested  = require('postcss-nested');
var scss    = require('postcss-scss');

gulp.task('html', function () {
	var minify = {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
		decodeEntities: true,
		removeComments: true
	};

	return gulp.src('src/html/*.html')
		.pipe(htmlmin(minify))
		.pipe(gulp.dest('www'));
});

gulp.task('styles', function () {
	var processors = [
		cssnano()
	];

	return gulp.src('./src/pcss/*.pcss')
		.pipe(postcss(processors))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('./www'));
});

gulp.task('scripts', function() {
	var tsOptions = {
		outFile: 'main.js'
	};

	return gulp.src('./src/ts/**/*.ts')
		.pipe(typescript(tsOptions))
		.pipe(uglify())
		.pipe(gulp.dest('www'));
});

gulp.task('default', ['html', 'styles', 'scripts'], function () {});
gulp.task('watch', function() {
	gulp.watch('./src/html/**/*', ['html']);
	gulp.watch('./src/pcss/**/*', ['styles']);
	gulp.watch('./src/ts/**/*', ['scripts']);
});