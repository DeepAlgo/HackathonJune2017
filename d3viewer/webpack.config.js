const path = require("path");

module.exports = {
    entry: {
        app: "./app/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    resolve: {
        // Tell webpack to try adding ".ts" to `import ...` statements it parses
        extensions: [".ts", ".js"],
        modules: [path.resolve(__dirname, "app"), "node_modules"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ["ts-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        compress: true,
        port: 8000,
        host: "0.0.0.0"
    }
};