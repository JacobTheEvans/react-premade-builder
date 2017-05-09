var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require('watchify');

var source = "./src/app.js";
var output = "./public/js/index.js";

var b = browserify({
  entries: [source],
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

var processAndBundle = function() {
  console.log("[+] Building new source");
  b.transform("babelify", {"presets": ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream(output))
  .on("finish", function(){
    console.log("[+] Build is complete");
  });
}

b.on("update", processAndBundle);
console.log("[+] Starting React/Redux/ES6 Builder");
processAndBundle();
