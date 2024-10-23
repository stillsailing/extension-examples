const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'
const devDirectory = 'dist-dev'
const plugins = [
  new HtmlWebpackPlugin({
    filename: 'popup.html',
    template: './src/popup/template.html',
    chunks: ['popup'],
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: './assets', to: '.' }],
  }),
]
if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode,
  devtool: isDev ? 'source-map' : false,
  entry: {
    popup: './src/popup/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, isDev ? devDirectory : 'build'),
    clean: true,
    filename: '[name].js',
  },
  stats: 'summary',
  devServer: {
    hot: true,
    static: [{ directory: path.resolve(__dirname, devDirectory) }],
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !/\.hot-update\.(js|json)/.test(filePath)
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins,
}
