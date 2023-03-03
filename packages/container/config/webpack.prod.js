// a fn to merge two webpack config objects
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// pull in common config
const commonConfig = require("./webpack.common");

const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    // to resolve some caching problems
    filename: "[name].[contenthash].js",
    // especially for mf apps. used by some part of webpack for a file built by webpack
    // e.g. html plugin generating script tags in the html files
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      // no need since it's a host module but docs recommend it
      name: "container",
      remotes: {
        // key maps to first part of import statements that use the marketing module
        // we must know the location of the hosted module at build time
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
