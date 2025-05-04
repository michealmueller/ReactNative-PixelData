module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-export-namespace-from',
      ['@babel/plugin-transform-class-properties', { loose: false }],
      ['@babel/plugin-transform-private-methods', { loose: false }],
      ['@babel/plugin-transform-private-property-in-object', { loose: false }]
    ],
  }
} 