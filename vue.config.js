module.exports = {
  plugins: [
    new NetlifyServerPushPlugin({
      headersFile: "_headers"
    })
  ]
};
