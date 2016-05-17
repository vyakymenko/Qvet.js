var gulp = require('./gulp')([
	'js-dev',
	'js-build',
	'watch'
]);


gulp.task('build',['js-build']);

gulp.task('dev',['js-dev']);

gulp.task('default', [
	'dev',
	'watch'
]);