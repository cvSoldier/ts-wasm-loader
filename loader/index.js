const fs = require('fs');
const path = require('path');
const asc = require("assemblyscript/cli/asc")
const { getOptions } =  require('loader-utils');


function mkDirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkDirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = function(source) {
  var innerCallback = this.async();
  const options = getOptions(this) || {};
  const relativeSourcePath = path.relative(process.cwd(), this.resourcePath)
  const publicPath = options.publicPath || path.dirname(relativeSourcePath)
  this.cacheable && this.cacheable();
  var targetPath = this._compiler.outputPath;
  
  var buildTempPath = path.join(this._compiler.context, publicPath);
  targetPath = path.join(
    buildTempPath,
    path.parse(this.resourcePath).name + ".wasm"
    );

  mkDirsSync(buildTempPath);

  const params = [
    relativeSourcePath,
    "-o",
    path.relative(process.cwd(), targetPath)
  ];

  asc.main(params, function(err) {
    if (err) throw err;
    var distFile = fs.readFileSync(targetPath);
    return innerCallback(null, distFile)
  })
}
