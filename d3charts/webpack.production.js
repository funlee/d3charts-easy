const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '[name].css'
})

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    vendor: ['d3', 'jquery', 'mockjs'],
    index: path.join(__dirname, 'scripts/index.js')
  },
  output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /node_modules/,
        include: /styles/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
      extractSass,
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
  ]
}