module.exports = (function(grunt) {
	var gruntConfigPath = "./config/grunt/"
		webpackConfig = {},
		isProduction = false;

	if (process.env.NODE_ENV != undefined) {
		switch(process.env.NODE_ENV) {
			case "prod":
			case "production":
				isProduction = true;
				break;
			case "dev":
			case "development":
				isProduction = false;
				break;
		} 
	}
		
	webpackConfig = require(gruntConfigPath + "webpack.config.js")(isProduction);

	return function(grunt) {
		require("load-grunt-tasks")(grunt);

		grunt.initConfig({
			"pkg": grunt.file.readJSON("package.json"),
			
			"clean": ['dist'],

			"watch": {
				"files": ["src/**/*"],
				"tasks": ["webpack"],
				"options": {
					"spawn": false,
				}
			}
		});

		grunt.config("webpack", webpackConfig);
		grunt.registerTask('default', ['clean','webpack'].concat(isProduction ? [] : ['watch']));
	}
}) ();