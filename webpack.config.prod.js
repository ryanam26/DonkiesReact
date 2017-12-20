var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/src/index.html",
  hash: true,
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: ["./src/index.js"],

  output: {
    path: "dist",
    filename: "index_bundle.js",
    publicPath: "/"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: __dirname + "/src",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: __dirname + "/src",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    root: [path.resolve("./src"), path.resolve("./node_modules")],
    extensions: ["", ".js"]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true
      },
      ie8: false,
      safari10: false,
      warnings: false
    }),
    HTMLWebpackPluginConfig
  ]
};
