module.exports = (function (params) {
    var nodeExternals = require('webpack-node-externals'),
        path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        staticPlugins, 
        rootPlugins,
        devTool, 
        modules, 
        resolves;

    devTool = "source-map";

    staticPlugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            "compress": { warnings: false },
            "output": { comments: false, semicolons: true },
            "sourceMap": false
        })
    ];

    rootPlugins = [].concat(staticPlugins, [
        new HtmlWebpackPlugin({
            "inject": false, 
            "template": path.resolve("./src/index.html"),
            //, "favicon": paths.appFavicon,
            "minify": {
                "removeComments": true,
                "collapseWhitespace": true,
                "removeRedundantAttributes": true,
                "useShortDoctype": true,
                "removeEmptyAttributes": true,
                "removeStyleLinkTypeAttributes": true,
                "keepClosingSlash": true,
                "minifyJS": true,
                "minifyCSS": true,
                "minifyURLs": true
            }
        })
    ]);

    modules = {
        "loaders": [ { "test": /\.tsx?$/, "loader": "ts-loader" } ],
        "preLoaders": [ { "test": /\.js$/, "loader": "source-map-loader" } ]
    };

    resolves = { "extensions": ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"] };

    return [{
        "cache": true,

        "entry": {
            "index": "./src/static/js/index.tsx"
        },

        "output": {
            "path": "dist/static/js/",
            "filename": "[name].bundle.js",
            "chunkFilename": "[id].chunck.js"
        },

        "resolve": resolves, "module": modules, "devtool": devTool, "plugins": staticPlugins, "externals": { "react": "React", "react-dom": "ReactDOM" }
    }, {
        "cache": true,

        "target": "node",

        "entry": {
            "app": "./src/app.ts"
        },

        "output": {
            "path": "dist/",
            "filename": "[name].js",
            "chunkFilename": "[id].js"
        },

        "resolve": resolves, "module": modules, "devtool": devTool, "plugins": rootPlugins, "externals": [nodeExternals()]
    }];
}) ();