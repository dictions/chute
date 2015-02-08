'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var httpServer = require('http-server');
// JS browserify stuff
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var stringify = require('stringify');


/*
 * Setting up tasks
 */

// Compiling Sass
gulp.task('sass', function () {
	gulp.src(['./public/assets/styles/sass/main.scss'])
		.pipe(sass({errLogToConsole: true}))
		.pipe(gulp.dest('./public/assets/styles/css/'))
		.pipe(livereload());
});

/*
 * Scripts
 */

// Bundler watching the app 
var bundler = watchify(browserify('./public/assets/scripts/app/index.js', watchify.args).transform(stringify(['.html'])));
gulp.task('scripts', bundleApp); // so you can run `gulp scripts` to build the file
bundler.on('update', bundleApp); // on any dep update, runs the bundler

function bundleApp() {
	return bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('index.js'))
		// optional, remove if you dont want sourcemaps
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('./public/assets/scripts/built'))
		.pipe(livereload());
}



/**
 * Setting up Live reload
 */

// Server for live reload
var createServer = function(port) {
	var server = httpServer.createServer({root:'./public', cache: -1});
	server.listen(port, function() {
		gutil.log('Listening on', port);
	});
};

// LiveReload Watch for starting front end dev
gulp.task('watch', function(){
	
	// Start and watch dev servers – LiveReload plugin required
	var server = createServer(8080);
	livereload.listen();

	// watch and process sass
	gulp.watch(['public/assets/styles/sass/**/*.scss', "!public/assets/styles/sass/vendor/**/*.scss"], ['sass'])
	.on('change', function(event){
		gutil.log(gutil.colors.cyan(event.path), 'changed');
	});

	// watch templates for changes
	gulp.watch('public/*.html')
	.on('change', function(event){
		livereload.changed();
		gutil.log(gutil.colors.yellow(event.path), 'changed');
	});
	
});

/**
 * Grouping Stuff
 */

gulp.task('default', ['sass', 'scripts', 'watch']);