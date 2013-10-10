# commander-utils v0.0.3  

[![Build Status](https://travis-ci.org/subtub/commander-utils.png?branch=master)](https://travis-ci.org/subtub/commander-utils)

## Table of Content

[General Information](#general-information)  
[Installation](#installation)  
[Examples](#examples)  
[API](#api)  
[Running Tests](#running-tests)  

## General Information

some commander.js utility functions  
## Installation

    npm install https://github.com/subtub/commander-utils/tarball/master
## Examples

The simple example initialize the utilitie functions to the commander object. Detailed information about the utils can be found at the [API](#api)

```
#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
var CommanderUtils = require('../');
var pkg = require('../package.json');

/**
 * Initialize the commander-utils module.
 */
CommanderUtils(program, pkg);

/**
 * Add an option to the commandline interface.
 */
program
  .option('-f, --foo', 'foo stuff')

/**
 * Parse the arguments.
 */
program
  .parseUtils()
  .parse(process.argv);

/**
 * If the --foo option is active, do someting.
 */
if (program.foo) {
  program.log.info('Foo to the Box');
};

```

A detailed example can be found at the [examples](/examples) directory.
## API
 
parseUtils()
------------
Parse the commands and options.

**Example**

    program
      .parse(process.argv)
      .parseUtils();




**Returns**

*Commander*,  The commander object.

setVersionLong(config)
----------------------
Set the version (long) of the cli tool.

**Example**

<pre>program.setVersionLong('v1.0.0 codename Release1');</pre>


**Parameters**

**config**,  The example snippets we want to print out.

setDescription(The)
-------------------
Set the description of the cli tool.

**Example**
<pre>program.setDescription('v1.0.0 codename Release1');</pre>



**Parameters**

**The**:  *String*,  project description.

setUpdate(The)
--------------
Set the description of the cli tool.

**Example**
<pre>program.setDescription('v1.0.0 codename Release1');</pre>



**Parameters**

**The**:  *Object*,  update configuration.

commandExample(config)
----------------------
Print an usage description for an option or command.

**Example**

    .on('--help', function() {  
        program.commandExample({  
        [ description: 'Description you want to display.',  
          usage: 'cli cmd -o' ]
      })
    })




**Parameters**

**config**,  The example snippets we want to print out.

log.setSilent(silent)
---------------------
Set the log silent boolean

**Example**
<pre>program.log.setSilent(false);</pre>



**Parameters**

**silent**:  *Boolean*,  


**Returns**

*Object*,  The log config object.

log.setColorless(colorless)
---------------------------
Set the log colorless boolean

**Example**
<pre>program.log.setColorless(false);</pre>



**Parameters**

**colorless**:  *Boolean*,  


**Returns**

*Object*,  The log config object.

log.info(\[message\])
---------------------
Log a info message.

**Example**
<pre>program.log.info('hello world');</pre>



**Parameters**

**[message]**:  *String*,  The message we want to log.

**Returns**

*String*,  The message we set at this function.

log.warn(\[message\])
---------------------
Log a warn message.

**Example**
<pre>program.log.warn('hello warn');</pre>



**Parameters**

**[message]**:  *String*,  The message we want to log.

**Returns**

*String*,  The message we set at this function.

## Running Tests

Clone the repository, install node modules and run the test with the following command:

    npm test
## Contributors

```
 project  : commander-utils
 repo age : 3 weeks
 active   : 10 days
 commits  : 95
 files    : 18
 authors  : 
    95	Paul Vollmer            100,0%

```

## License

```
The MIT License (MIT)  
  
Copyright (c) 2013 subtub  
  
Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.  
  ```

---

*This Readme was generated by [subtool](https://www.github.com/subtub/subtool/releases/tag/v0.0.3) on Thu Oct 10 2013 11:50:03 GMT+0200 (CEST).*  
