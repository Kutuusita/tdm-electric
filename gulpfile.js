'use strict';

const gulp = require('gulp'),
        sass = require('gulp-sass')(require('sass')),
        rigger = require('gulp-rigger'),
        sync = require('browser-sync'),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer'),
        cleanCSS = require('gulp-clean-css'),
        rollup = require('gulp-better-rollup'),
        babel = require('rollup-plugin-babel'),
        resolve = require('rollup-plugin-node-resolve'),
        commonjs = require('rollup-plugin-commonjs'),
        terser = require('gulp-terser');


function html () {
    return gulp.src([
        'src/index.html',
        ])
        .pipe(rigger())
        // .pipe(htmlmin({
        //     removeComments: true,
        //     collapseWhitespace: true,
        // }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Images
// function compress() {
//     return gulp.src('images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/images'))
// };


// Styles


function styles() {
    return gulp.src('src/styles/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({overrideBrowserslist: ['last 8 versions'],
                            browsers: [
                            'Android >= 4',
                            'Chrome >= 20',
                            'Firefox >= 24',
                            'Explorer >= 11',
                            'iOS >= 6',
                            'Opera >= 12',
                            'Safari >= 6',
                            ]}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream());
};


// Scripts

function scripts() {
    return gulp.src('src/js/index.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
};

// // Copy

function copy() {
    return gulp.src([
            'src/fonts/**/*',
            'src/images/**/*',
            'src/documents/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};


// // Server

function server(){
    sync.init({
        ui: false,
        notify: false,
        port: 54679,
        server: {
            baseDir: 'dist'
        }
    });
};

function watch() {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/styles/**/*.scss', gulp.series(styles));
    gulp.watch('src/js/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
        'src/documents/**/*',
    ], gulp.series(copy));
};

exports.server = server;

exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    // paths,
    gulp.parallel(
        watch,
        server,
    ),
);