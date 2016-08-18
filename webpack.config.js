const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: [
        './app/app.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }, {
                test: /(\.css)$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};