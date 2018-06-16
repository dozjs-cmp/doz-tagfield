const webpack = require('webpack');
const unminifiedWebpackPlugin = require('unminified-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/doz-tagfield.min.js',
        library: 'DozTagfield',
        umdNamedDefine: true,
        libraryTarget: 'umd'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            }, include: /\.min\.js$/
        }),
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            SHORT: 'DOZ-TAGFIELD',
            components: {
                InjectAsComment: true,
                InjectByTag: true
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: 'Build version: {version}'
                }
            }
        }),
        new unminifiedWebpackPlugin()
    ]
};