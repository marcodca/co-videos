const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  return {
    entry: ["@babel/polyfill", "./index.js"],
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: '/',
      filename: "bundle.js",
    },
    context: path.resolve(__dirname, "src"),
    module: {
      rules: [
        { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "./assets/",
              },
            },
          ],
        },
      ],
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
      historyApiFallback: true,
      stats: "errors-only",
      open: true,
      port: 8080,
      compress: true,
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
    ],
  };
};
