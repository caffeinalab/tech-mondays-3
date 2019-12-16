const independentModernBundler = require('./utils/webpack-bundlers').independentModern
const runBundler = require('./utils/run-bundler')
const noop = require('./noop')

function webpackIndependentModern() {
  if (!independentModernBundler) return noop()

  return runBundler(independentModernBundler)
}

module.exports = webpackIndependentModern
