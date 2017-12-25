const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let plugins = [];
let devtool = "";

if (process.env.NODE_ENV === "production") {
  plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "assets", "html", "index.html"),
      hash: true,
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ];
} else {
  devtool = "source-map";
  plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "assets", "html", "index.html"),
      hash: true,
      filename: "index.html",
      inject: "body"
    })
  ];
}

module.exports = {
  devtool: devtool,

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

  plugins: plugins,

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
