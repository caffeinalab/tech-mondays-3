const cloneDeep = require('lodash.clonedeep')

const configBase = require('./es5')
const moduleModern = require('./module-configs/modern')

const config = cloneDeep(configBase)
config.module = moduleModern
config.output.filename = '[name].modern.js'
config.output.chunkFilename = '[name].modern.chunk.js'

module.exports = config
