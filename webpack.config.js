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
        index: path.join(__dirname, 'scripts/index.js'),
        bar: path.join(__dirname, 'scripts/bar.js'),
        line: path.join(__dirname, 'scripts/line.js'),
        area: path.join(__dirname, 'scripts/area.js'),
        map: path.join(__dirname, 'scripts/map.js'),
        pie: path.join(__dirname, 'scripts/pie.js')
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
            exclude: /node_modules/,
            include: /styles/
        },  {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}