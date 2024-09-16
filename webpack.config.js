const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

// если режим сборки "development", то используем стандартный
// режим "web", иначе добавляем префиксы.
const target = mode === 'development' ? 'web' : 'browserslist';

module.exports = {
  mode,
  target,
  devtool: 'source-map',
  // Конфигурация DevServer
  devServer: {
    hot: true,
    static: {
      // directory: path.join(__dirname, 'public'),
    },
    // compress: true,
    // port: 9000,
  },

  // Входящий файл
  entry: './src/script/index.js',
  // Исходящий файл
  output: {
    filename: '[name][contenthash].js',
    // filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // Подключаем плагины
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        // Что мы делаем, выполнение идет c самого конца
        use: [
          // 4) Минифицируем и вытаскиваем css из js, подгружая в html
          MiniCssExtractPlugin.loader,
          'css-loader', // 3) загружаем css в js
          'postcss-loader', // 2) добавляем префиксы
          'sass-loader', // 1) делаем из sass - css
        ],
      },
    ],
  },
};