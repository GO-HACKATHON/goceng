var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  cache: 'true',
  entry: {
    app: path.join(__dirname, 'src', "index.js")
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      { test: /\.css?$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      { test: /\.(png|jpg|jpeg|gif|ico)$/, loader: "file-loader?name=[path][name].[ext]"},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name].[ext]" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" },
      { test: /\.json$/, loader: 'json' },
    ]
  },

  context: path.join(__dirname, 'src'),

  plugins: [
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      inject: true,
      template: "index.html"
    }),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' }
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}
