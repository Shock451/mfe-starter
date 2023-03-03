const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // define a loader to tell webpack to process some different
      // files as we import them into the project

      // babel will process all code from ES2015 upwards to ES5 code
      {
        // any file that ends with mjs or js should be processed by babel
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // preset-react for babel to process all different jsx tags
            // in the app
            // preset-env will transform all the code in a variety of ways to ES5
            presets: ["@babel/preset-react", "@babel/preset-env"],
            // add additional code to enable some features in the project outside
            // the browser, such as async-await syntax
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
