/*jslint bitwise: true, unparam: true, maxerr: 50, white: true, nomen: true */
/*globals require, providers, exports, process */
/*!
 * crafity-config - Generic configuration provider
 * Copyright(c) 2011 Crafity
 * Copyright(c) 2011 Bart Riemens
 * Copyright(c) 2011 Galina Slavova
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
	, core = require('crafity-core')
	, objects = core.objects;

/**
 * Loaded configuration
 */

var configurations = {};

/**
 * Open a configuration
 * @param {String} path (Optional) The path to the config file
 * @param {Boolean} info (Optional) Print information
 * @param {Function} callback A callback called when config is loaded
 */

exports.open = function (path, info, callback) {
	if (info instanceof Function && !callback) {
		callback = info;
		if (typeof path === 'boolean') {
			info = path;
			path = process.cwd() + "/config.json";
		} else {
			info = false;
		}
	}
	if (path instanceof Function && !callback) {
		callback = path;
		info = info || false;
		path = process.cwd() + "/config.json";
	}

	if (configurations[path]) { return callback(null, configurations[path]); }

	fs.readFile(path, function (err, data) {
		if (err) { callback(err); } else {
			var config = JSON.parse(data.toString())
				, environment = process.env.NODE_ENV || config.environment;

			if (!environment) {
				return callback(new Error("No configuration environment is set in the configuration file or NODE_ENV."))
			} else if (!config[environment]) {
				return callback(new Error("Environment '" + environment + "' is not defined in the configuration."))
			}

			info && console.log("crafity-configuration:", "Selecting environment setting '"
				+ environment + "' as configured in '" +
				(process.env.NODE_ENV ? "NODE_ENV" : "Configuration file") + "'");

			var result = objects.merge(config.shared, config[environment]) || {};
			result.environment = environment;
			configurations[path] = result;
			callback(null, result);
		}
	});

};
