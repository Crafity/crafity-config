#Crafity Config

Load in a JSON configuration file quick and easy with Node.JS.
This module can be used to load in different settings for different targrt environments.

An example configuration file for a web server could look something like this.

    {
      "environment": "development",
      "shared": {
        "webserver": {
          "port": 4242,
          "gzip": true
        }
      },
      "development": {
        "webserver": {
          "ip": "127.0.0.1"
        }
      },
      "production": {
        "webserver": {
          "port": 80
          "ip": "0.0.0.0"
        }
      }
    }

To load the configuration use the following code. 

    var configuration = require('crafity-config');
    		
    configuration.open(function (err, config) {
      if (err) { throw err; }
      		  
      // Work with the configuration
      		  
    });

More about the environments later...

> (The MIT License)
> 
> Copyright (c) 2010-2012 Bart Riemens <briemens@crafity.com>
> Copyright (c) 2010-2012 Galina Slavova <galina@crafity.com>
> Copyright (c) 2010-2012 Crafity <info@crafity.com>
> 
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

