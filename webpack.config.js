const webpack = require("webpack");

module.exports = {
  entry: "./frontend/App.jsx",
  output: {
    path: "./public/js",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query:
      {
        presets: ["es2015", "stage-1", "react"]
      }
    }, { test: /\.json$/, loader: "json-loader" } ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    /*new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })*/
  ]
};
