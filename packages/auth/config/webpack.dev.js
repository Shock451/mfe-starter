// a fn to merge two webpack config objects
const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// pull in common config
const commonConfig = require("./webpack.common");

const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    // historyApiFallback: {
    //   index: "index.html",
    // },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// devConfig overrides commonConfig where they overlap
module.exports = merge(commonConfig, devConfig);
