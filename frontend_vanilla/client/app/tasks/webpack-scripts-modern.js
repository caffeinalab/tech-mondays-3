const scriptsBundler = require('./utils/webpack-bundlers').scriptsModern
const runBundler = require('./utils/run-bundler')

function webpackWorkers() {
  return runBundler(scriptsBundler)
}

module.exports = webpackWorkers
