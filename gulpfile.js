var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var spritesmith = require('gulp.spritesmith');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts_vendor', function() {
    return gulp.src('app/js/lib/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js/dist/'));
});
gulp.task('scripts_app', function() {
    return gulp
        .src('app/js/modules/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js/dist/'));
});



gulp.task('sprite', function () {
    var spriteData = gulp.src('app/img/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        padding: 20,
        algorithm: 'top-down'
    }));
    return spriteData.pipe(gulp.dest('app/img/'));
});

/*gulp.task('default', function () {
 gulp.src('app/css/!*css')
 .pipe(concatCss("bundle.css"))
 .pipe(minifyCss({compatibility: 'ie8'}))
 .pipe(rename('bundle.min.css'))
 .pipe(gulp.dest("app"))
 .pipe(notify("Done!"));
 });

 gulp.task('sass', function () {
 gulp.src('./sass/!**!/!*.scss')
 .pipe(sass.sync().on('error', sass.logError))
 .pipe(gulp.dest('./css'));
 });

 gulp.task("watch", function () {
 gulp.watch("app/css/!*.css", ["default"]);
 });


 var compassImagehelper = require('gulp-compass-imagehelper');

 gulp.task('cimg', function () {
 return gulp.src('app/img/base64/!*.+(jpeg|jpg|png|gif|svg)')
 .pipe(compassImagehelper({
 targetFile: 'images.scss', // default target filename is '_compass-imagehelper.scss'
 template: 'app/scss/data_gen.scss.mustache',
 images_path: '/img/',
 css_path: 'css/',
 prefix: 'img-'
 }))
 .pipe(gulp.dest('app/scss'))
 .pipe(notify("Image compile!!!"));
 });

 gulp.task("imgwatch", function () {
 gulp.watch("app/img/!*",["cimg"]);
 });*/

var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch("app/js/**/**/*.js",['scripts_app']);
    gulp.watch("app/js/**/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task("post-css", function(){
    return gulp.src("app/css/*.css")
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        })).pipe(gulp.dest('app/css'));
});

gulp.task('default', ['serve']);