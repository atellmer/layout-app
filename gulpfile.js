var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

var root = 'client/';

var path = {
	app: root + 'app/',
	dist: root + 'dist/',
};

gulp.task('connect', function () {
	connect.server({
		root: root.slice(0, -1),
		port: 3000,
		livereload: true
	});
});

gulp.task('styles', function () {
	return gulp.src(path.app + '**/*.styl')
		.pipe(concat('bundle.styl'))
		.pipe(stylus({
			use: [nib()],
			compress: false
		}))
		.pipe(gulp.dest(path.dist))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	return gulp.src(root + '**/*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(path.app + '**/*.styl', ['styles']);
	gulp.watch(root + '**/*.html', ['html']);
});

gulp.task('default', [
	'connect',
	'styles',
	'watch'
]);