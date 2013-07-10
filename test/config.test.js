var jstest = require('crafity-jstest').createContext("Crafity Config")
  , core = require('crafity-core')
  , assert = jstest.assert
  ;

jstest.run({
  "Require the crafity config module": function () {
    var config = require('../config.js');
  }
});


