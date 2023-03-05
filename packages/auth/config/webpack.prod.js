// a fn to merge two webpack config objects
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// pull in common config
const commonConfig = require("./webpack.common");

const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/auth/latest/",
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
  ],
};

// devConfig overrides commonConfig where they overlap
module.exports = merge(commonConfig, prodConfig);
