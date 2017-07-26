const webpack = require("webpack");

module.exports = config => {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["mocha"],
    reporters: ["mocha"],
    files: ["./index.test.js"],
    preprocessors: {
      "./index.test.js": ["webpack", "sourcemap"]
    },
    webpack: {
      devtool: "inline-source-map",
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("test")
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
