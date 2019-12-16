const gulp = require('gulp')
const paths = require('../config/paths')
const options = require('../config/options')

module.exports = function watch() {
  return new Promise(resolve => {
    gulp.watch(`${paths.src.styles}/**/*.{sass,scss}`,
      gulp.series('styles')
    )

    // gulp.watch(
    //   [
    //     `${paths.src.scripts}/**/*.js`,
    //     `!${paths.src.scripts}/independent/**/*.js`
    //   ],
    //   gulp.series(
    //     'webpack-scripts-es5',
    //     'webpack-scripts-modern',
    //     'reload-browser'
    //   )
    // )

    gulp.watch(`${paths.src.scripts}/independent/**/*.js`,
      gulp.series(
        'webpack-independent-es5',
        'webpack-independent-modern',
        'reload-browser'
      )
    )

    gulp.watch(`${paths.src.assets}/**/*.*`,
      gulp.series('optimize-assets', 'reload-browser')
    )

    gulp.watch(`${paths.src.static}/**/*.*`,
      gulp.series('copy-static')
    )

    gulp.watch(`${paths.src.locales}/*.po`,
      gulp.series(
        'convert-po',
        options.server ? 'noop' : 'views',
        'reload-browser'
      )
    )

    if (!options.server) {
      gulp.watch(`${paths.src.views}/**/*.{njk,html}`,
        gulp.series(
          'views',
          'reload-browser'
        )
      )
      gulp.watch(`${paths.src.fixtures}/**/*.json`,
        gulp.series(
          'views',
          'reload-browser'
        )
      )
    }

    resolve()
  })
}
