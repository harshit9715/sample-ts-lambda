const path = require('path');
const nodeBuiltins = require('builtin-modules');

const externals = ['aws-sdk'].concat(nodeBuiltins).reduce((externals, moduleName) => {
  externals[moduleName] = moduleName;
  return externals;
}, {});

module.exports = {
  entry: './index.ts',
  externals,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { onlyCompileBundledFiles: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: 'index.js',
  },
  target: 'node',
  optimization: {
    minimize: false,
  },
  devtool: 'inline-cheap-module-source-map',
};
