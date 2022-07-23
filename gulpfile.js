const { src, dest, series, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const sync = require("browser-sync").create();
const jsmin = require("gulp-jsmin");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

//Init path directory
const path = {
  styles: {
    src: "src/scss/**.scss",
    dist: "dist",
  },
  styles_setting: {
    src: "src/scss/settings/**.scss",
    dist: "dist",
  },
  styles_component: {
    src: "src/scss/components/**.scss",
    dist: "dist",
  },
  scripts: {
    src: "src/scripts/**.js",
    dist: "dist/scripts",
  },
  images: {
    src: "src/assets/**",
    dist: "dist/assets",
  },
  html: {
    src: "src/html/**.html",
    dist: "dist",
  },
  pages: {
    src: "src/html/pages/**.html",
    dist: "dist/pages",
  },
  component_html: {
    src: "src/html/components/**.html",
    dist: "dist/components",
  },
};

//Function work to .html files
function html() {
  return (
    src(path.html.src)
      .pipe(
        include({
          prefix: "@@",
        })
      )
      .pipe(
        htmlmin({
          collapseWhitespace: true,
        })
      )
      .pipe(dest(path.html.dist)),
    src(path.pages.src)
      .pipe(
        include({
          prefix: "@@",
        })
      )
      .pipe(
        htmlmin({
          collapseWhitespace: true,
        })
      )
      .pipe(dest(path.pages.dist))
  );
}

//Function work images
function images() {
  return src(path.images.src).pipe(imagemin()).pipe(dest(path.images.dist));
}

//Function work to .scss files
function scss() {
  return src("src/scss/**.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 version"],
      })
    )
    .pipe(csso())
    .pipe(concat("index.css"))
    .pipe(dest("dist"));
}

//Function work to .js files
function js() {
  return src(path.scripts.src)
    .pipe(jsmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path.scripts.dist));
}

//Function clear element from directory dist
function clear() {
  return del("dist/**");
}

//Function run server to dev
function serve() {
  sync.init({
    server: "./dist",
  });

  watch(path.html.src, series(html)).on("change", sync.reload);
  watch(path.component_html.src, series(html)).on("change", sync.reload);
  watch(path.pages.src, series(html)).on("change", sync.reload);

  watch(path.styles_component.src, series(scss)).on("change", sync.reload);
  watch(path.styles_setting.src, series(scss)).on("change", sync.reload);
  watch(path.styles.src, series(scss)).on("change", sync.reload);

  watch(path.scripts.src, series(js)).on("change", sync.reload);
  watch(path.images.src, series(images)).on("change", sync.reload);
}

//export series func to terminal
exports.serve = series(clear, scss, html, js, images, serve);
exports.build = series(clear, scss, html, images, js);
exports.clear = clear;
