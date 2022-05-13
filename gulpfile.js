const {src, dest, series, watch} = require('gulp');

const sass = require('gulp-sass')(require('sass'));

const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const sync = require('browser-sync').create();

function html(){
    return (src('src/html/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist')), 
    
        src('src/html/pages/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))    
        )
}

function scss() { 
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))

}

function clear(){
    return (
        del('dist/**.html'),
        del('dist/**.css')
    )
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/html/**.html', series(html)).on('change', sync.reload)
    watch('src/html/components/**.html', series(html)).on('change', sync.reload)
    watch('src/html/pages/**.html', series(html)).on('change', sync.reload)
    watch('src/html/parts/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/components/**.scss', series(scss)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

exports.serve = series(clear, scss, html, serve)
exports.build = series(clear, scss, html)
exports.clear = clear