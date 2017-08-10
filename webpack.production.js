const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '[name].css'
})

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    vendor: ['d3', 'jquery', 'mockjs', 'lodash'],
    index: path.join(__dirname, 'scripts/index.js'),
    test: path.join(__dirname, 'scripts/test.js')
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
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/helpers'
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
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
          ],
          fallback: 'style-loader'
        })
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