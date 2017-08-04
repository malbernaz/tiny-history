const webpack = require("webpack");

module.exports = config => {
  const customLaunchers = {
    sl_chrome: {
      base: "SauceLabs",
      platform: "windows 10",
      browserName: "chrome",
      version: "47.0"
    },
    sl_firefox: {
      base: "SauceLabs",
      platform: "windows 10",
      browserName: "firefox",
      version: "43.0"
    },
    sl_safari: {
      base: "SauceLabs",
      platform: "os x 10.11",
      browserName: "safari",
      version: "9.0"
    },
    sl_mobilesafari8: {
      base: "SauceLabs",
      platform: "os x 10.11",
      browserName: "iphone",
      version: "7.1"
    },
    sl_mobilesafari9: {
      base: "SauceLabs",
      platform: "ios",
      browserName: "safari",
      version: "8.1",
      deviceName: "iphone emulator"
    },
    sl_internetexplorer10: {
      base: "SauceLabs",
      platform: "windows 8",
      browserName: "internet explorer",
      version: "10.0"
    },
    sl_androidbrowser: {
      base: "SauceLabs",
      browserName: "browser",
      platform: "android",
      deviceName: "android emulator",
      version: "4.4"
    }
  };

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

  if (process.env.TRAVIS) {
    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.reporters = ["dots", "saucelabs"];
    config.SauceLabs = {
      testName: "Web App Unit Tests",
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: false
    };
  }
};
