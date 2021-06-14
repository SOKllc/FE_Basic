const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsLoader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        ["@babel/preset-react", { targets: "defaults" }],
      ],
      plugins: ["@babel/plugin-proposal-class-properties"],
    },
  },
};

const cssLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: ["style-loader", "css-loader"],
};

const picLoader = {
  test: /\.(png|jpe?g|gif)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 244,
        name: "images/[name].[ext]",
      },
    },
  ],
};

module.exports = {
  devtool: "eval-nosources-cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: "",
  },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [jsLoader, cssLoader, picLoader],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
