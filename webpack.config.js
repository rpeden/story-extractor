const webpack = require("webpack");
//const ClosureCompilerPlugin = require("webpack-closure-compiler");
const path = require("path");

module.exports = {
  entry: "./frontend/App.jsx",
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
        presets: [["es2015", { modules: false }], "stage-1", "react"]
      }
    }, { test: /\.json$/, loader: "json" } ]
  },
  resolve: {
    /*alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      "react-addons-transition-group": "preact-transition-group"
    },*/
    extensions: [".js", ".jsx"],
    modules: [
      //path.resolve('./client'),
      "node_modules"
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new BabiliPlugin(),
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
    /*new ClosureCompilerPlugin({
      compiler: {
        "language_in": "ECMASCRIPT6",
        "language_out": "ECMASCRIPT5_STRICT",
        "compilation_level": "SIMPLE"
      },
      //eslint-disable-next-line
      concurrency: 6,
  })*/]
};
