var gulp = require('gulp');
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");
var del = require("del");
var babel = require('gulp-babel');
var watch = require("gulp-watch");
var runSequence = require('run-sequence').use(gulp);
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var pug_path = ['src/pug/*.pug','src/pug/**/*.pug'];
var sass_path = ['src/scss/app.scss','src/scss/**/*.scss'];
var sass_vendor = ['src/scss/vendor/*','src/scss/vendor/**/*'];
var js_path = ['src/js/main.js','src/js/**/*.js','!src/js/vendor/**/*'];
var js_vendor_path = ['src/js/vendor/*','src/js/vendor/**/*', ];
var img_path = ['src/assets/img/*','src/assets/img/**/*'];




gulp.task('pug',function(){
    return  gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .on("error", gutil.log)
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
    return gulp.src(sass_path)
        .pipe(plumber())
        .pipe(sass())
        .on("error", gutil.log)
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch',['pug','sass'], function(){
    gulp.watch(sass_path,['sass']);
    gulp.watch(pug_path,['pug']);
    gulp.watch(js_path,['js', 'es6-commonJS']);
});


gulp.task('css_vendor', function(){
    return gulp.src(sass_vendor)
        .pipe(gulp.dest('dist/assets/css/vendor'));
});

gulp.task('img',function(){
    return gulp.src(img_path)
        .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('fonts', function(){
    return gulp.src(['src/assets/fonts/*', 'src/assets/fonts/**/*'])
        .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('js', function() {
    return gulp.src(js_path)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('js_vendor', function(){
    return gulp.src(js_vendor_path)
        .pipe(gulp.dest('dist/assets/js/vendor'));
});

gulp.task('es6-commonJS', function () {
    return browserify('dist/assets/js/main.js')
.bundle()
        .pipe(source('bundle.js'))
.pipe(gulp.dest('dist/src/js'))
});

gulp.task('default', function(){
    runSequence('clean','fonts','js', ['pug', 'sass','js_vendor',  'es6-commonJS', "css_vendor", 'img'],"watch")
});
