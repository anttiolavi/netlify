const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');

const DEST_DIR = 'build';

gulp.task('default', function(cb) {
    runSequence('clean', 'build', cb);
});

gulp.task('build', [
    'copy',
    'css'
]);

gulp.task('build-watch', ['build'], function(cb) {
    browserSync.reload();
    cb();
});

gulp.task('watch', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    return gulp.watch(['src/**/*'], ['build-watch']);
});

gulp.task('css', () => {
    return gulp.src('src/main.scss')
        .pipe(gp.sass())
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browserSync.stream());
});

gulp.task('copy', () => {
    return gulp.src([
        'src/**/*',
        '!src/**/*.scss'
    ])
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task('clean', () => {
    return gulp.src(DEST_DIR, {read: false})
        .pipe(gp.clean());
}); 