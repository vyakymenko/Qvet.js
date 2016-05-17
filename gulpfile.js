var sequence = require('run-sequence'),
	gulp = require('./gulp')([
		'js-dev',
		'js-build',
		'license',
		'watch'
	]);



gulp.task('build', function () {
	sequence(
		'js-build',
		'license'
	);
});

gulp.task('dev', function () {
	sequence(
		'js-dev',
		'license'
	);
});

gulp.task('default', [
	'dev',
	'watch'
]);