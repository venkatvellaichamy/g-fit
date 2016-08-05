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

    devTool = "eval";

    staticPlugins = [
        new webpack.optimize.OccurrenceOrderPlugin()
    ];

    rootPlugins = [].concat(staticPlugins, [
        new HtmlWebpackPlugin({
            "inject": false, 
            "template": path.resolve("./src/index.html")
            //, "favicon": paths.appFavicon 
        })
    ]);

    modules = {
        "loaders": [ { "test": /\.tsx?$/, "loader": "ts-loader" } ],
        "preLoaders": [ { "test": /\.js$/, "loader": "source-map-loader" } ]
    };

    resolves = { "extensions": ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"] };

    return [{
        "watch": true,

        "debug": true,

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