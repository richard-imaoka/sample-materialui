'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var size = require('gulp-size');
var browserSync = require('browser-sync').create();

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'src/styles/*.scss',
        'src/styles/**/*.css',
        'src/styles/components/components.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(changed('.tmp/styles', {extension: '.css'}))
        .pipe(sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('dist/styles'))
        .pipe(size({title: 'styles'}));
});


gulp.task('html', function () {
    return gulp.src('./*.html').pipe(gulp.dest('dist'));
});

// Javascript files to concat (Browserify), Transpile, Uglify, in Watchify mode
gulp.task('watchify', function () {
    var opts = assign({}, watchify.args, {entries: ['./src/javascripts/app.js'], debug: true, verbose: true});

    //Be careful - gulp-browserify plugin is deprecated now
    var watchifyBundler = watchify(browserify(opts));

    //Register transforms and on-event callbacks
    watchifyBundler.transform(babelify);
    //watchifyBundler.transform({global: true}, uglifyify);
    watchifyBundler.on('update', bundle); // on any dep update, runs the bundler
    watchifyBundler.on('log', gutil.log); // output build logs to terminal

    //bundle() step to be run every time on update
    function bundle() {
        console.log("updated detected");
        return watchifyBundler
            .bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error')) // log errors if they happen
            .pipe(source('bundle.js'))
            .pipe(buffer())  // optional, remove if you don't need to buffer file contents
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist'));
    }

    return bundle();
});

// Watch files for changes & reload
gulp.task('serve', ['styles'], function () {
    //gulp.watch(['app/images/**/*'], browserSync.reload);
});

gulp.task('watch', ['watchify', 'styles'], function () {
    browserSync.init({
        notify: false,
        // Customize the BrowserSync console logging prefix
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: "dist"
        }
    });


    gulp.watch('./*.html', ['html', browserSync.reload] );
    gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', browserSync.reload]);
    gulp.watch(['dist/*.js'], browserSync.reload);
});