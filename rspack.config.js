const path = require('path');
const { rspack } = require("@rspack/core");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: rspack.CssExtractRspackPlugin.loader
          },
          'css-loader',
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/icons/[name][hash][ext]"
        }
      },
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
    }),
    new rspack.CssExtractRspackPlugin(),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    historyApiFallback: true,
    compress: true,
    port: 3005
  }
};