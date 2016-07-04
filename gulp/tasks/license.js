var gulp = require('gulp'),
	header = require('gulp-header'),
	pkg = require('../../package.json'),
	conf = require('../config');

var licence = [
	'/**',
	' * Qvet - <%= pkg.description %>',
	' * ',
	' * @version v<%= pkg.version %>',
	' * @author <%= pkg.author %>',
	' * @license <%= pkg.license %>',
	' */'
].join('\n');

module.exports = function () {
	gulp.src(conf.dist.main+'*.js')
		.pipe(header(licence, {pkg : pkg}))
		.pipe(gulp.dest(conf.dist.main));
};
