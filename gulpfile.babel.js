const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-ruby-sass');

gulp.task('compile_js', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile_html', () => {
  return gulp.src('./src/front-end/views/**/*.html')
    .pipe(gulp.dest('./dist/front-end/views'));
});

gulp.task('compile_styles', () => {
  return sass('./src/front-end/styles/styles.sass')
    .pipe(gulp.dest('./dist/front-end/styles/'));
});

gulp.task('default', ['compile_js', 'compile_html', 'compile_styles'], () => {
  gulp.watch('./src/**/*.js', () => {
    gulp.run('compile_js');
  });
  gulp.watch('./src/front-end/views/**/*.html', () => {
    gulp.run('compile_html');
  });
  gulp.watch('./src/front-end/styles/**/*.sass', () => {
    gulp.run('compile_styles');
  });
});
