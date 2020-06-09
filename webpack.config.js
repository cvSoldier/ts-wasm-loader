'use strict'
const path = require('path')

module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: path.resolve('loader/index.js'),
        options: {
          name: `[name].ts.wasm`
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}