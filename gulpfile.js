import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js( done ) {
    src('src/js/app.js')
        .pipe(dest('build/js'));
    done();
}

export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true}) //Mostrar el mapeo entre css y los módulos sass
        .pipe(sass().on('error', sass.logError)) // Muestra errores de Sass en la consola
        .pipe(dest('build/css', {sourcemaps: true}));
    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    //observa todos los archivos scss de la carpeta scss (actualizaciones automaticas)
    // SE AÑADIÓ SOPORTE PARA ARCHIVOS JS
}

export default series(js, css, dev);