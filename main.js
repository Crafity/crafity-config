/*jslint node: true, white: true */
"use strict";

/*!
 * crafity-config - Generic configuration provider
 * Copyright(c) 2010-2013 Crafity
 * Copyright(c) 2010-2013 Bart Riemens
 * Copyright(c) 2010-2013 Galina Slavova
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , objects = require('crafity-core').objects
  ;

/**
 * Module name.
 */

module.exports.fullname = "crafity-config";

/**
 * Module version.
 */

module.exports.version = '0.1.0';

/**
 * Loaded configuration
 */

var configurations = {};

/**
 * Open a configuration
 * @param {String|Object} [path] (Optional) The path to the config file
 * @param {Boolean} [info] (Optional) Print information
 * @param {Function} callback A callback called when config is loaded
 */

exports.open = function open(path, info, callback) {
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
  if (!callback) {
    throw new Error("Argument 'callback' is required");
  }

  function finish(err, result) {
    return process.nextTick(function () {
      return callback(err, err ? undefined : result);
    });
  }

  if (configurations[path]) {
    return finish(null, configurations[path]);
  }

  return fs.readFile(path, function (err, data) {
    if (err) {
      return finish(err, undefined);
    }

    var config = JSON.parse(data.toString())
      , environment = process.env.NODE_ENV || config.environment
      , result
      ;

    if (!environment) {
      return finish(new Error("No configuration environment is set in the configuration file or NODE_ENV."), undefined);
    }
    if (!config[environment]) {
      return finish(new Error("Environment '" + environment + "' is not defined in the configuration."), undefined);
    }

    if (info) {
      console.log("crafity-configuration:", "Selecting environment setting '" +
        environment + "' as configured in '" +
        (process.env.NODE_ENV ? "NODE_ENV" : "Configuration file") + "'");
    }

    result = objects.merge(config.shared, config[environment]) || {};
    result.environment = environment;
    configurations[path] = result;

    return finish(null, result);

  });

};
