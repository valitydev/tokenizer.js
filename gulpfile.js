const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const eslint = require('gulp-eslint');

const config = {
    dist: 'dist/tokenizer'
};

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('browserify', ['lint'], () => {
    return browserify({
        entries: 'src/bootstrap.js',
        extensions: ['.js'],
        debug: true
    }).transform("babelify").bundle()
        .pipe(source('tokenizer.js'))
        .pipe(gulp.dest(config.dist));
});

gulp.task('uglify', ['browserify'], () => {
    return gulp.src(`${config.dist}/tokenizer.js`)
        .pipe(rename('tokenizer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist));
});

gulp.task('provider', () => {
    return gulp.src(['src/rpc/provider.html'])
        .pipe(gulp.dest(config.dist));
});

gulp.task('connectDist', () => {
    connect.server({
        root: 'dist',
        host: '127.0.0.1',
        port: 7000
    });
});

gulp.task('connectSample', () => {
    connect.server({
        root: 'sample',
        host: '127.0.0.1',
        port: 7001
    });
});

gulp.task('watch', () => {
    gulp.watch('src/**/*', ['build']);
});

gulp.task('build', ['uglify', 'provider']);
gulp.task('develop', ['build', 'connectDist', 'watch', 'connectSample']);
gulp.task('default', ['build']);