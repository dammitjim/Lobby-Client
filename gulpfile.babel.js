const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-ruby-sass');

gulp.task('compile_back_end_js', () => {
  // gulp.src('./src/app.js')
  //   .pipe(babel())
  //   .pipe(gulp.dest('./dist'));
  // gulp.src('./src/back-end/**/*.js')
  //   .pipe(babel())
  //   .pipe(gulp.dest('./dist/back-end'));
});

gulp.task('compile_front_end_js', () => {
  gulp.src('./src/front-end/js/**/*.jsx')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/front-end/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile_html', () => {
  return gulp.src('./src/front-end/**/*.html')
    .pipe(gulp.dest('./dist/front-end'));
});

gulp.task('compile_styles', () => {
  return sass('./src/front-end/styles/styles.sass')
    .pipe(gulp.dest('./src/front-end/styles/'));
});

gulp.task('default', ['compile_back_end_js', 'compile_front_end_js', 'compile_html', 'compile_styles'], () => {
  gulp.watch(['./src/*.js', './src/back-end/**/*.js'], () => {
    gulp.run('compile_back_end_js');
  });
  gulp.watch('./src/front-end/js/**/*.js', () => {
    gulp.run('compile_front_end_js');
  });
  gulp.watch('./src/front-end/**/*.html', () => {
    gulp.run('compile_html');
  });
  gulp.watch('./src/front-end/styles/**/*.sass', () => {
    gulp.run('compile_styles');
  });
});
