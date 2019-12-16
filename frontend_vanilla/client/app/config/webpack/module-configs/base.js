module.exports = {
  rules: [
    {
      test: /\.(glsl|frag|vert)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'raw-loader',
      }
    },
    {
      test: /\.(glsl|frag|vert)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'glslify-loader',
      }
    },
    {
      test: /\.json$/,
      exclude: /(node_modules|vendors)/,
      loader: 'json-loader'
    },
  ]
}
