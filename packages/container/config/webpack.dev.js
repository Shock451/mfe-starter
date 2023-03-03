// a fn to merge two webpack config objects
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// pull in common config
const commonConfig = require("./webpack.common");

const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // can be array of strings or MF plugin will accept the
      // packageJson.dependencies object as an array of strings
      shared: packageJson.dependencies,
    }),
  ],
};

// devConfig overrides commonConfig where they overlap
module.exports = merge(commonConfig, devConfig);
