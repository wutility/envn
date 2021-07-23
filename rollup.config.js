import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'index.js',
  output: [
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: false
    },
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: false
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    terser()
  ]
};
