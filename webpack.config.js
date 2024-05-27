const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const htmlPluginCfg = new htmlPlugin({
  template: path.resolve(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});

const copyPluginCfg = new copyPlugin({
  patterns: [{ from: 'maps/*.json', to: 'maps/[name].json' }],
});

const tsconfigPathsPluginCfg = new TsconfigPathsPlugin();

module.exports = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|mp3|wav)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
            outputPath: 'assets/musicas/',
          },
        },
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      },
      {
        test: require.resolve('phaser'),
        loader: 'expose-loader',
        options: {
          exposes: {
            globalName: 'Phaser',
            override: true,
          },
        },
      },
    ],
  },
  plugins: [new Dotenv(), htmlPluginCfg, copyPluginCfg],
  devServer: {
    static: path.resolve(__dirname, './dist'),
    host: 'localhost',
    port: 8080,
    open: false,
    hot: true,
    watchFiles: ['src/**/*.ts', 'index.html'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [tsconfigPathsPluginCfg],
  },
};
