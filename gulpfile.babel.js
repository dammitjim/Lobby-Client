const gulp = require('gulp');
const sass = require('gulp-ruby-sass');

gulp.task('compile_styles', () => {
  return sass('./src/front-end/styles/styles.sass')
    .pipe(gulp.dest('./src/front-end/styles/'));
});

gulp.task('default', ['compile_styles'], () => {
  gulp.watch('./src/front-end/styles/**/*.sass', () => {
    gulp.run('compile_styles');
  });
});
