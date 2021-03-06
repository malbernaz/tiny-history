import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify-es";
import filesize from "rollup-plugin-filesize";

export default {
  strict: true,
  input: "./index.js",
  name: "createHistory",
  sourcemap: true,
  plugins: [
    buble({
      objectAssign: "Object.assign",
      exclude: ["node_modules/**"]
    }),
    uglify({
      compress: {
        unsafe: true,
        dead_code: true,
        pure_getters: true
      }
    }),
    filesize()
  ]
};
