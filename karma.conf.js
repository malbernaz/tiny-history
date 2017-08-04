const webpack = require("webpack");

module.exports = config => {
  const customLaunchers = {
    SL_Chrome: {
      base: "SauceLabs",
      platform: "Windows 10",
      browserName: "chrome",
      version: "47.0"
    },
    SL_Firefox: {
      base: "SauceLabs",
      platform: "Windows 10",
      browserName: "firefox",
      version: "43.0"
    },
    SL_Safari: {
      base: "SauceLabs",
      platform: "OS X 10.11",
      browserName: "safari",
      version: "9.0"
    },
    SL_MobileSafari8: {
      base: "SauceLabs",
      platform: "OS X 10.11",
      browserName: "iphone",
      version: "7.1"
    },
    SL_MobileSafari9: {
      base: "SauceLabs",
      platform: "ios",
      os_version: "9.1",
      browserName: "iphone"
    },
    SL_InternetExplorer10: {
      base: "SauceLabs",
      platform: "Windows 8.1",
      browserName: "ie",
      version: "10.0"
    },
    SL_AndroidBrowser: {
      base: "SauceLabs",
      browserName: "Browser",
      platform: "Android",
      version: "4.3"
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
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY
    };
  }
};
