const path              = require('path')
const webpack           = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const devBuild = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template:   `${__dirname}/client/index.html`,
  filename:   'index.html',
  inject:     'body'
})

const configs = {
  entry: [
    `${__dirname}/client/index.jsx`
  ],
  output: {
    path:       `${__dirname}/public`,
    filename:   'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders:[
      {
        test:     /\.jsx?$/,
        exclude:  /node_modules/,
        loaders:  ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    HTMLWebpackPluginConfig
  ],
  resolve: {
    modules: [
      path.resolve('client'),
      path.resolve('node_modules')
    ]
  }
}

if(!devBuild) {
  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      comparisons: true,
      conditionals: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      drop_console: true
    },
    output: {
      comments: false
    }
  }))
}

module.exports = configs
