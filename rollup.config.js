import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";

export default {
  useStrict: true,
  format: "umd",
  entry: "./index.js",
  moduleName: "History",
  plugins: [
    buble(),
    uglify({
      compress: {
        unsafe: true,
        dead_code: true,
        pure_getters: true,
        pure_funcs: ["_classCallCheck"]
      }
    })
  ]
};
