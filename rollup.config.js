import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";

export default {
  useStrict: true,
  entry: "./index.js",
  moduleName: "History",
  sourceMap: true,
  plugins: [
    buble(),
    uglify({
      compress: {
        unsafe: true,
        dead_code: true,
        pure_getters: true
      }
    })
  ]
};
