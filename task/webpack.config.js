const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/renderer/style/index.scss', './src/renderer/script/index.ts'],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'script.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loader: {
              scss: 'vue-style-loader!css-loader!sass-loader',
            },
            sourceMap: true,
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: [
                  require('autoprefixer')(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.scss', '.vue', '.svg'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
}
