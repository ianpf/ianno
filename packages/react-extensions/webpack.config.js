const baseConfig = require("../webpack.base.config");
const path = require("path");

module.exports = Object.assign({}, baseConfig, {
    entry: {
        select: [
            "./src/index.ts"
        ],
    },

    // externals: COMMON_EXTERNALS,

    output: {
        filename: "[name].bundle.js",
        library: ["ianno", "Validation"],
        libraryTarget: "common",
        path: path.resolve(__dirname, "./dst")
    },
});