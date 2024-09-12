const path = require('path');
const mode = process.env.NODE_ENV || 'development';


module.exports = {
  mode,
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
};