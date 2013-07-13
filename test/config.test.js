/*jslint node: true, bitwise: true, unparam: true, maxerr: 50, white: true, stupid: true */
"use strict";

/*!
 * crafity-config - Tests for the configuration functionality
 * Copyright(c) 2013 Crafity
 * Copyright(c) 2013 Bart Riemens
 * Copyright(c) 2013 Galina Slavova
 * MIT Licensed
 */

/**
 * Test dependencies.
 */

var jstest = require('crafity-jstest').createContext("Crafity Config")
  , core = require('crafity-core')
  , assert = jstest.assert
  ;

jstest.run({
  "Require the crafity config module": function () {
    var config = require('../main.js');
    assert.isFunction(config.open, "Expected an open function");
  }
});


