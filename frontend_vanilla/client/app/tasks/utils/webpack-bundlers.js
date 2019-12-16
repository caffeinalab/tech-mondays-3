const glob = require('glob')
const webpack = require('webpack')

const path = require('path')
const paths = require('../../config/paths')

const options = require('../../config/options')

const srcPath = path.resolve(paths.src.scripts)

const webpackConfigEs5 = require('../../config/webpack/es5.js')
const webpackConfigModern = require('../../config/webpack/modern.js')

const entries = {}
const independentEntries = {}
const plugins = []

glob.sync(`${srcPath}/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  const entry = []

  if (!options.production) {
    entry.push('webpack/hot/dev-server')
    entry.push('webpack-hot-middleware/client?reload=true')
  }

  // Actual entry MUST be after webpack stuff
  entry.push(filepath)

  entries[entryId] = entry
})

glob.sync(`${srcPath}/independent/**/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  independentEntries[entryId] = filepath
})

if (!options.production) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const bundlers = {
  scripts: webpack(Object.assign({}, webpackConfigEs5, {entry: entries, plugins})),
  scriptsModern: webpack(Object.assign({}, webpackConfigModern, {entry: entries, plugins})),
}

if (Object.keys(independentEntries).length) {
  const destPath = paths.dist.scripts + '/independent'
  const outputEs5 = Object.assign({}, webpackConfigEs5.output, {path: path.join(process.cwd(), destPath)})
  const outputModern = Object.assign({}, webpackConfigModern.output, {path: path.join(process.cwd(), destPath)})

  bundlers.independent = webpack(Object.assign({}, webpackConfigEs5, {entry: independentEntries, plugins: [], output: outputEs5}))
  bundlers.independentModern = webpack(Object.assign({}, webpackConfigModern, {entry: independentEntries, plugins: [], output: outputModern}))
}

module.exports = bundlers
