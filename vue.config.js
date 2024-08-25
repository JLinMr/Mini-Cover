module.exports = {
  devServer: {
    port: 3000
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].minify = false;
      return args;
    });
    config.optimization.splitChunks(false);
  },
  productionSourceMap: false,
  css: {
    extract: false
  }
};