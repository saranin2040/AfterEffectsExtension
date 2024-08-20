const path = require('path');

module.exports = {
  entry: './src/main/languagecep/Controller/javascript/MainControllers/MainPage.js', // Укажите ваш входной файл
  output: {
    path: path.resolve(__dirname, './src/dist'),
    filename: 'MainPage.bundle.js', // Файл, который будет создан
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Использование Babel для совместимости с ES6
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false, // fs нельзя использовать в браузере
      "child_process": false, // child_process нельзя использовать в браузере
      "os": require.resolve("os-browserify/browser"),
      "util": require.resolve("util/")
    }
  },
  mode: 'production', // Используйте 'development' для разработки
};
