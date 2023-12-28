const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins() {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Форма оплаты',
      inject: 'head',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
