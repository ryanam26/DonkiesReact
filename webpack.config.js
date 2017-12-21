const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [path.resolve(__dirname, "assets", "js", "index.js")],

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "index_bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "assets", "js"),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "assets", "html", "index.html"),
      hash: true,
      filename: "index.html",
      inject: "body"
    })
  ],

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "~Scripts": path.resolve(__dirname, "assets", "js")
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  }
};
