export default {
  // targets: 'last 2 Chrome versions',
  
  presets: [
    [
      '@babel/preset-env',
      {
        // targets: 'last 2 Chrome versions',

        // 'usage' = add the polyfills needed automatically
        // 'entry' = requires explicit import of core-js
        //
        // use `usage` in this library will cause error because babel place polyfills
        // at wrong position in the bundle; which sometimes happens when using `usage`
        // in this library, the error happens because variable `_export` is used before being defined 
        useBuiltIns: 'entry',

        corejs: {
          version: '3.21', // change it to the last version
          proposals: true,
        },
      },
    ],
  ],
};