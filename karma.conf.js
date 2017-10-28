const webpack = require("webpack");

module.exports = config => {
  const customLaunchers = {
    sl_chrome: {
      base: "SauceLabs",
      browserName: "Chrome",
      version: "47.0"
    },
    sl_firefox: {
      base: "SauceLabs",
      browserName: "firefox",
      version: "43.0"
    },
    sl_ie: {
      base: "SauceLabs",
      browserName: "internet explorer",
      version: "9.0"
    },
    sl_safari: {
      base: "SauceLabs",
      browserName: "Safari",
      version: "9.0"
    },
    sl_mobilesafari: {
      base: "SauceLabs",
      platformName: "iOS",
      platformVersion: "8.1",
      deviceName: "iPhone Simulator",
      browserName: "Safari",
      appiumVersion: "1.6.5"
    },
    sl_androidbrowser: {
      base: "SauceLabs",
      platformName: "Android",
      platformVersion: "4.4",
      deviceName: "Android Emulator",
      browserName: "Browser",
      appiumVersion: "1.6.5"
    }
  };

  const configuration = {
    browsers: ["ChromeHeadless"],
    frameworks: ["mocha"],
    reporters: ["mocha"],
    files: ["./index.test.js"],
    concurrency: 1,
    preprocessors: {
      "./index.test.js": ["webpack", "sourcemap"]
    },
    webpack: {
      devtool: "inline-source-map",
      module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
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
    configuration.sauceLabs = {
      testName: "Cross Browser Testing",
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: false
    };
  }

  config.set(configuration);
};
