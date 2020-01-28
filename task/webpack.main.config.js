const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    main: './src/main/main.ts',
    preload: './src/main/preload.ts',
  },
  target: 'electron-main',
  mode: env,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: env === 'production' ? false : 'source-map',
}
