const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    devServer: {
        port: 8080,
        contentBase: 'static',
        proxy: {
          '/': {
            target: 'http://localhost:3000',
          },
        },
    },
    plugins: [
     new HtmlWebPackPlugin({
       template: "./public/index.html",
       filename: "./index.html"
     })
    ],
    node: {
        fs: "empty"
    }
};
module.exports = config;