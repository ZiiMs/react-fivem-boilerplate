const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = require('./webpack.common')({
  mode: 'development',

  // Add hot reloading in development
  entry: [
    path.join(process.cwd(), 'src/index.js'),
  ],

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: 'public/index.html',
    }),
  ].filter(Boolean),
  optimization: {
      minimize: true,
      minimizer: [
          new TerserWebpackPlugin({
              terserOptions: {
                  compress: {
                      comparisons: false
                  },
                  mangle: {
                      safari10: true
                  },
                  output: {
                      comments: false,
                      ascii_only: true
                  },
                  warnings: false
              }
          }),
          new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
          chunks: "all",
          minSize: 0,
          maxInitialRequests: 20,
          maxAsyncRequests: 20,
          cacheGroups: {
              vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name(module, chunks, cacheGroupKey) {
                      const packageName = module.context.match(
                          /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                      )[1];
                      return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                  }
              },
              common: {
                  minChunks: 2,
                  priority: -10
              }
          }
      },
      runtimeChunk: "single"
  }
});
