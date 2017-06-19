const webpack = require("webpack");
//const ClosureCompilerPlugin = require("webpack-closure-compiler");
const path = require("path");

module.exports = {
  entry: "./frontend/components/App.jsx",
  output: {
    path: path.resolve(__dirname, "./public/js"),
    filename: "app.bundle.js"
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query:
      {
        comments: false,
        presets: [["es2015", { modules: false }], "stage-1", "react"],
        plugins: ["transform-decorators-legacy"]
      }
    }, { test: /\.json$/, loader: "json" } ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      "node_modules"
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
};
