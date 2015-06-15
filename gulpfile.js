var gulp = require("gulp");
var webserver = require("gulp-webserver");
var typescript = require("gulp-typescript")

var typescriptProject = typescript.createProject({
  target: "ES5", 
  removeComments: true, 
  sortOutput: true
});

gulp.task("server" , function() {
    gulp.src("public")
        .pipe(webserver({
            livereload: true
        }));
});


gulp.task("tsc", function() {
    gulp.src(["./public/scripts/**/**.ts"])
        .pipe(typescript(typescriptProject))
        .js
        .pipe(gulp.dest("public/js/"));
});

gulp.task("watch", function() {
    gulp.watch("./public/scripts/**/**.ts", ["tsc"]);
});

gulp.task("default", ["server", "watch"]);

