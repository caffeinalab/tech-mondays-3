const path = require('path')
const paths = require('../paths')
const options = require('../options')
const moduleEs5 = require('./module-configs/es5')
const srcPath = path.resolve(paths.src.scripts)
const destPath = paths.dist.scripts

module.exports = {
  entry: null,
  plugins: null,
  context: srcPath,
  mode: options.production ? 'production' : 'development',
  devtool: options.production ? false : 'inline-module-source-map',
  performance: {
    hints: options.production ? 'warning' : false,
  },
  output: {
    path: path.join(process.cwd(), destPath),
    publicPath: destPath.replace(paths.dist.public, '') + '/', // Remove src directory from path
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: moduleEs5,
  resolve: {
    modules: ['node_modules', `${paths.src.scripts}/vendors`],
    alias: {
      '~': `${process.cwd()}/scripts`
    }
  }
}
