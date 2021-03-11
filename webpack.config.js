const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.ts"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    library: "compartilhador",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
  },
};
