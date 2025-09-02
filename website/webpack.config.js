// webpack.config.js
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts', // Your main file
  mode: 'development',
  
  resolve: {
    fallback: {
      // These replace Node.js modules with browser-compatible versions
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "process": require.resolve("process/browser"),
      "util": require.resolve("util"),
      "url": require.resolve("url"),
      "assert": require.resolve("assert")
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  
  plugins: [
    // These inject global variables that Node.js normally provides
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  ],
  
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};