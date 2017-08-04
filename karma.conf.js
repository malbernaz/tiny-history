const webpack = require("webpack");

module.exports = config => {
  const customlaunchers = {
    sl_chrome: {
      base: "saucelabs",
      platform: "windows 10",
      browsername: "chrome",
      version: "47.0"
    },
    sl_firefox: {
      base: "saucelabs",
      platform: "windows 10",
      browsername: "firefox",
      version: "43.0"
    },
    sl_safari: {
      base: "saucelabs",
      platform: "os x 10.11",
      browsername: "safari",
      version: "9.0"
    },
    sl_mobilesafari8: {
      base: "saucelabs",
      platform: "os x 10.11",
      browsername: "iphone",
      version: "7.1"
    },
    sl_mobilesafari9: {
      base: "saucelabs",
      platform: "ios",
      browsername: "safari",
      version: "8.1",
      devicename: "iphone emulator"
    },
    sl_internetexplorer10: {
      base: "saucelabs",
      platform: "windows 8",
      browsername: "internet explorer",
      version: "10.0"
    },
    sl_androidbrowser: {
      base: "saucelabs",
      browsername: "browser",
      platform: "android",
      devicename: "android emulator",
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
    config.sauceLabs = {
      testName: "Web App Unit Tests",
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: false
    };
  }
};
