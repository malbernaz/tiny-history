const webpack = require("webpack");

module.exports = config => {
  const customLaunchers = {
    sl_chrome: {
      base: "SauceLabs",
      platform: "Windows 10",
      browserName: "Chrome",
      version: "47.0"
    },
    sl_firefox: {
      base: "SauceLabs",
      platform: "Windows 10",
      browserName: "firefox",
      version: "43.0"
    },
    sl_safari: {
      base: "SauceLabs",
      platform: "OS X 10.11",
      browserName: "Safari",
      version: "9.0"
    },
    sl_mobilesafari8: {
      base: "SauceLabs",
      platformName: "iOS",
      browserName: "Safari",
      platformVersion: "8.1",
      deviceName: "iPhone Simulator",
      appiumVersion: "1.6.4"
    },
    sl_internetexplorer10: {
      base: "SauceLabs",
      platform: "Windows 8",
      browserName: "internet explorer",
      version: "10.0"
    },
    sl_androidbrowser: {
      base: "SauceLabs",
      browserName: "Browser",
      platformName: "Android",
      deviceName: "Android Emulator",
      platformVersion: "4.4",
      appiumVersion: "1.6.4"
    }
  };

  const configuration = {
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
  };

  if (process.env.TRAVIS) {
    configuration.customLaunchers = customLaunchers;
    configuration.browsers = Object.keys(customLaunchers);
    configuration.reporters = ["dots", "saucelabs"];
    configuration.SauceLabs = {
      testName: "Web App Unit Tests",
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: false
    };
  }

  config.set(configuration);
};
