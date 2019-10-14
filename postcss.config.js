var webpack = require('webpack');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: './src/style/*',
      addDependencyTo: webpack
    }),
    require('postcss-cssnext')({
      browsers : ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
    })
  ]
}