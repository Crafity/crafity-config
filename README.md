#Crafity Config [![Dependency status](https://david-dm.org/crafity/crafity-config.png)](https://david-dm.org/crafity/crafity-config) [![Travis Build Status](https://travis-ci.org/Crafity/crafity-config.png?branch=master)](https://travis-ci.org/Crafity/crafity-config)  

This module can be used to load in different configuration settings based on a target environments.  
In almost every project there are platform and environment specific settings. Think about *paths, port numbers, databases and web services, credentials, etc, etc*.  

##Installation
The easiest way to install Crafity Config is via NPM

    ~ npm install crafity-config
    
Or by cloning this repository

    ~ git clone https://github.com/Crafity/crafity-config.git
    ~ cd crafity-config
    ~ npm install

##Configuration
Let's take a look at a sample configuration file for a web server. 

    {
      "environment": "development",
      "shared": {
        "webserver": {
          "ip": "127.0.0.1",
          "port": 4242,
          "gzip": true
        }
      },
      "development": {
        "webserver": {
          "gzip": false,
          "debug": true
        }
      },
      "test": {},
      "production": {
        "webserver": {
          "port": 80
          "ip": "0.0.0.0"
        }
      }
    }

Save this configuration to a file called **config.json** and place it in the root of your application. 
Of course another name and path can be used as well, but that needs to be specified explicitly (see [The API](#the-api) section).

##The code
To load the config.json data use the following JS code. 

    // Require the crafity config module
    var configuration = require('crafity-config');
    
    // Open the default configuration
    configuration.open(function (err, config) {
      if (err) { throw err; }
      
      // Work with the configuration
      
    });

##Environments
So what are these environments and how do you configure them?   
In the example JSON above you can see three environments: Shared, development and production.  
Only the shared environment is a special case, the other two are made up.

###Shared environment
As the names states the shared environment shares its settings with the other custom defined environments. 
Often there are settings that do not differ from one environment to the next or most of the environments 
share the same setting except for a few. To prevent a lot of duplication the shared environment can be used.
By default an environment inherits all the shared settings. The environment specific settings are then added or overwritten.  

In the sample JSON configuration above you can see the following scenarios:
* The development environment gets all the shared settings, but disables gzip explicitly and adds a debug setting.
* The test environment is exactly the same as shared environment.
* The production environment get the shared settings, but changes the IP and Port.

###Select an environment
When a configuration file is loaded the environment property will be used to set the default environment.
In the sample above the development environment will be used by default.    

To overide the default environment a NODE_ENV variable can be specified on the command line to force a specific environment.
In the example below the production environment will be used:

    ~ NODE_ENV=production node main.js 

*NB. The environment name is case sensitive.*

##The API
More info about the API is coming...

## The MIT License
* Copyright (c) 2013 Bart Riemens <briemens@crafity.com>  
* Copyright (c) 2013 Galina Slavova <galina@crafity.com>  
* Copyright (c) 2013 Crafity <info@crafity.com>  

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

*THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*

