const apiMocker = require("connect-api-mocker"),
  remoteAPI = false,
  remoteServer = "https://www.cosmonio.com/";

module.exports = {
  configureWebpack: {
    optimization: {
      // Only minimize the Javascript if the NODE_ENV is 'production', to speed up local development.
      minimize: process.env.NODE_ENV === "production"
    }
  },

  devServer: {
    proxy: remoteAPI
      ? {
          "^/api": {
            target: remoteServer,
            ws: true,
            changeOrigin: true
          }
        }
      : "",
    before: function(app) {
      if (!remoteAPI) {
        app.use(apiMocker("/api", "mocks/api"));
      }
    }
  },

  chainWebpack: function(config) {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: process.env.NODE_ENV !== "production"
      });
  },

  productionSourceMap: false
};
