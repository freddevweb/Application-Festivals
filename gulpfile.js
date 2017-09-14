/*
// install
npm install gulp
npm install gulp-sass
npm install gulp-sourcemaps
npm install gulp-livereload
npm install gulp-clean-css
npm install gulp-csscomb

 */


var scss_folder_src = './sass/**/*.scss'; // gulp.src & livereload watch --> folder/file sass  
var dest_css = './assets/css'; // folder dest css
var csscomb_src_scss = './sass/styles.scss'; // csscomb source scss 
var csscomb_dest_scss = './sass'; // csscomb dest scss
var html_livereload_src_file = './index.html'; // htmlreload  source file 
var html_livereload_src_folder = './*.html'; // htmlreload source folder   

// VAR DE CHARGEMENT DES MODULES
var sourceNodeModule = "../../";

var gulp = require( "gulp" );
var sass = require( "gulp-sass" );
var sourcemaps = require( "gulp-sourcemaps" );
var livereload = require( "gulp-livereload" );
var csscomb = require( 'gulp-csscomb' ); //gérer l'incrémentation
// var sourcemaps = require('gulp-sourcemaps'); //mappage sur le nav chrome du css en scss
var cleanCSS = require( 'gulp-clean-css' ); // permet de minimifier fichier css

// PILE D'EXECUTION GULP SASS
gulp.task ('sass', function () {
  return gulp.src(scss_folder_src)
    // .pipe(sourcemaps.init()) // début sourcemap
        .pipe(sass().on('error', sass.logError)) //compil sass
    .pipe(cleanCSS()) //minification
    // .pipe(sourcemaps.write()) // écrit le source map en fin de fichier
        .pipe(gulp.dest(dest_css))
        .pipe(livereload()); // on recharge les fichiers pour le live "re-loading"
});

gulp.task('styles', function() { 
  return gulp.src(csscomb_src_scss)
    .pipe(csscomb())
    .pipe(gulp.dest(csscomb_dest_scss));
});

gulp.task('htmlreload', function () {
    return gulp.src(html_livereload_src_file).pipe(livereload());
});

gulp.task("js", function(event) {
    return gulp.src('./js/*.js')
    .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([scss_folder_src, html_livereload_src_folder], ["sass", "htmlreload", "js"]);
});
