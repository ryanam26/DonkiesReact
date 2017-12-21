const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!resolve-url!sass-loader?sourceMap"
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: "file-loader"
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ],
    extensions: [".js", ".css", ".scss"]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        // compress: {
        //   warnings: false,
        //   conditionals: true,
        //   unused: true,
        //   comparisons: true,
        //   sequences: true,
        //   dead_code: true,
        //   evaluate: true,
        //   if_return: true,
        //   join_vars: true
        // },
        // output: {
        //   comments: false
        // }
      }
    }),
    new ExtractTextPlugin("css/style_bundle.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      hash: true,
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ]
};
