const cloneDeep = require('lodash.clonedeep')
const moduleBase = require('./base')

const modern = cloneDeep(moduleBase)
modern.rules.push(
  {
    test: /\.js$/,
    exclude: [/node_modules\/(?!(okiba|@okiba)\/).*/],
    use: {
      loader: 'babel-loader',
      options: {
        'presets': [
          [
            '@babel/preset-env',
            {
              'targets': [
                'Edge >= 16',
                'Firefox >= 60',
                'Chrome >= 61',
                'Safari >= 11',
                'Opera >= 48'
              ],
              'ignoreBrowserslistConfig': true,
              'debug': true,
              'useBuiltIns': 'usage',
              modules: false,
              'corejs': 3
            }
          ]
        ],
        'plugins': [
          [
            '@babel/plugin-proposal-decorators', {
              legacy: true
            }
          ],
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import'
        ]
      }
    },
  }
)
module.exports = modern
