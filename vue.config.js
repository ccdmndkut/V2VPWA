var PrerenderSpaPlugin = require("prerender-spa-plugin");
var path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    subpage: "src/subpage/main.js"
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        new PrerenderSpaPlugin(
          // Absolute path to compiled SPA
          path.resolve(__dirname, "dist"),
          // List of routes to prerender
          ["/"],
          {
            // options
          }
        )
      ]
    };
  }
};
