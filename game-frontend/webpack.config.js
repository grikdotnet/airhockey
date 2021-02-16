const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./game-frontend/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [ new HtmlWebpackPlugin() ]
};
