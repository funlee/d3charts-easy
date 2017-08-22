const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: path.join(__dirname, '../src/app.js'),
    vendor: ['d3', 'mockjs','jquery']
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool:'inline-source-map',
  devServer:{
    port:8080,
    hot:true
  },
  plugins:[
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.hbs')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['bundle'],
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        loader:'url-loader',
        options: {
          limit: 50000,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: /\.(png|svg|jpg|gif)$/,
        }
      }
    ]
  }
}