import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    
      // configFile: './babel.config.js', // already is default
      // browserslistConfigFile: './.browserslistrc', // already is default

      // presets: [['@babel/preset-env', { targets: 'defaults, not ie 11' }]], // you can also define presets here
    }),
  ],
};
