const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //indicamos el punto de entrada
  entry: './src/index.js',
  //indicamos donde se va a guardar el proyecto
  output: {
    //creamos un archivo dist
    path: path.resolve(__dirname, 'dist'),
    //indicamos el nombre del archivo resultante
    filename: 'bundle.js',
    //indicamos la ruta publica
    publicPath: '/'
  },
  //indicamos las extensiones que utilizaremos
  resolve: {
    extensions: ['.js', '.jsx']
  },
  //creamos reglas necesarias para la construccion de nuestros recursos
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      }
    ]
  },
  //indicamos los plugins que vamos a utilizar
  plugins: [
    new HtmlWebpackPlugin({
      //es el punto de entrada de la app
      template: './public/index.html',
      //con este nombre se envia a produccion
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css'
    })
  ],
  mode: process.env.NODE_ENV || "development",
  //creamos un servidor de trabajo local
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    //es para que muestre todas las rutas
    historyApiFallback: true,
    port: 3005,
  }
};
