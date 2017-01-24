var fs = require('fs')

var path = require('path')
var projectRoot = __dirname

let nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: path.join(projectRoot, 'src/index.js'),
  target: 'node',
  devtool: 'source-map',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: nodeModules,
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    path: path.join(projectRoot, 'build'),
    publicPath: '/assets/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: projectRoot,
        exclude: /node_modules/
      }
    ]
  }
}
