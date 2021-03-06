'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import del from 'del';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import usemin from 'gulp-usemin';
import rev from 'gulp-rev';
import cleanCss from 'gulp-clean-css';
import flatMap from 'gulp-flatmap';
import htmlmin from 'gulp-htmlmin';


gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', gulp.series('browser-sync', function () {
    gulp.start('sass:watch');
}));

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function (done) {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,wof,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    done();
});

gulp.task('imagemin', function () {
    return gulp.src('img/*.{png,jpg,gif}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function () {
    return gulp.src('./*.html')
        .pipe(flatMap(function (stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function () { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }))
                .pipe(gulp.dest('dist/'));
        }));
});

gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin', function (done) {
    done();
}));