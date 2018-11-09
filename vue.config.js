module.exports = {
    pages: {
      index: {
        entry: "src/index/main.js",
        template: "public/index.html",
        filename: "index.html",
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        subpage: "src/subpage/main.js"
      }
    };