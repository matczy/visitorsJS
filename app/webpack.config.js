'use strict';


const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var bowerRoot = path.join(__dirname, '/app/3rd_party/bower_components');

module.exports = {
    devtool: 'sourcemap',
    context: path.resolve(__dirname + '/'),
    entry: {
        app: './app/src/app.js'
    },

    output: {
        path: path.resolve(__dirname + '/app/src/static/'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: [/lib/, /node_modules/, /3rd_party/, /plugins/], loader: 'ng-annotate!babel'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.styl$/, loader: 'style!css!stylus'},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },

            {
                test: /\.json$/,
                loader: "json-loader"
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin(
            {$: "jquery", jQuery: "jquery", "window.jQuery": "jquery"},
            {angular: "angular", "window.angular": "angular"}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + '/app/index.html'),
            inject: 'body'
        }),
    ],
};


