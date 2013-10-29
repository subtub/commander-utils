# commander-utils v0.1.6  

[![Build Status](https://travis-ci.org/subtub/commander-utils.png?branch=master)](https://travis-ci.org/subtub/commander-utils)

## Table of Content

[General Information](#general-information)  
[Installation](#installation)  
[Examples](#examples)  
[API](#api)  
[Running Tests](#running-tests)  

## General Information

The `commander-utils` add some useful functions to the `commander.js` module.

_[back to table of content](#table-of-content)_
## Installation

Install the `commander-utils` by running:

    npm install https://github.com/subtub/commander-utils/tarball/master

If you want to add the module to `package.json` paste this line:

    "commander-utils": "https://github.com/subtub/commander-utils/archive/v0.1.3.tar.gz"

_[back to table of content](#table-of-content)_
## Examples

The simple example initialize the utility functions to the `commander.js` object.  
Detailed information about the utils can be found at the [API](#api)

```js
#!/usr/bin/env node

/**
 * This example integrates some package.json information.
 * Also add an example command and description to the --help output.
 */


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
 * Add an example command to the main --help page.
 */
program.addExamples([{description: 'description of the example',
                      command:     'the command'}]);

/**
 * Add an option to the commandline interface.
 */
program
  .option('-f, --foo', 'foo stuff')

/**
 * Parse the arguments.
 */
program.parseUtils(process.argv);

/**
 * If the --foo option is active, do someting.
 */
if (program.foo) {
  program.log.info('Foo to the Box');
};

```

A detailed example can be found at the [examples](/examples) directory.

_[back to table of content](#table-of-content)_
## API
 
getLastArg()
------------
Get the last argument.



**Returns**

*String*,  The last argument

parseUtils()
------------
Parse the commands and options. The `program.parse` function is included at this function.

**Example**
```js
program.parseUtils(process.argv);
```




**Returns**

*Commander*,  The commander object.

setVersionLong(versionLong)
---------------------------
Set a long version of the cli tool. So we can add a codename or some other stuff.
If no long version was set, we use the `package.json` version.

**Example**
<pre>program.setVersionLong('v1.0.0 codename Release1');</pre>



**Parameters**

**versionLong**:  *String*,  A long version.

**Returns**

*Commander*,  The commander.js object.

setDescription(description)
---------------------------
Set the description of the cli tool.
If no description was set, we use the `package.json` description.

**Example**
<pre>program.setDescription('v1.0.0 codename Release1');</pre>



**Parameters**

**description**:  *String*,  The project description.

**Returns**

*Commander*,  The commander.js object.

addExamples(The)
----------------
Add examples to the main --help output.

**Example**
```js
program.addExamples([{description: 'description of the example',
                      command:     'the command'}]);
```

Print out the following lines to console:

```
  Examples:

    # description of the example
    $ the command

```




**Parameters**

**The**:  *Object*,  example as object.

**Returns**

*Commander*,  The commander.js object.

setUpdate(update)
-----------------
Set the update settings for the cli tool.

**Example**
<pre>program.setUpdate('v1.0.0 codename Release1');</pre>



**Parameters**

**update**:  *Object*,  The update configuration.

**Returns**

*Commander*,  The commander.js object.

noMainHelp()
------------
Print no --help content if no command or option was set.
This can be used if you want to process something without other commands or options.
This overrides the default settings.



**Returns**

*Commander*,  The commander.js object.

commandExample(config)
----------------------
Print out an usage description for an option or command.

**Example**
```js
.on('--help', function() {  
  program.commandExample({  
    description: 'description of the command you want to display.',  
    examples: [{description: 'description of the example',
                command:     'cli cmd -o'},
               {description: 'an other description',
                command:     'cli othercmd -f'}]
  })
})
```

Print out the following lines to console:

```
  Description:
    description of the command you want to display.

  Usage Examples:
    # description of the example
    $ cli cmd -o

    # an other description
    $ cli othercmd -f

```




**Parameters**

**config**:  *Object*,  The example snippets we want to print out.

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

log.info(message)
-----------------
Log a info message.

**Example**
<pre>program.log.info('hello world');</pre>



**Parameters**

**message**:  *String*,  The message we want to log.

**Returns**

*String*,  The message we set at this function.

log.warn(message)
-----------------
Log a warn message.

**Example**
<pre>program.log.warn('hello warn');</pre>



**Parameters**

**message**:  *String*,  The message we want to log.

**Returns**

*String*,  The message we set at this function.

log.error(message)
------------------
Log an error message.

**Example**
<pre>program.log.error('hello error');</pre>



**Parameters**

**message**:  *String*,  The message we want to log.

**Returns**

*String*,  The message we set at this function.


_[back to table of content](#table-of-content)_
## Running Tests

Clone the repository, install node modules and run the test with the following command:

    npm test

_[back to table of content](#table-of-content)_
## Contributors

```
 project  : commander-utils
 repo age : 5 weeks
 active   : 17 days
 commits  : 176
 files    : 24
 authors  : 
   176	Paul Vollmer            100,0%

```


_[back to table of content](#table-of-content)_
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

_[back to table of content](#table-of-content)_


---

*This Readme was generated by [subtool](https://www.github.com/subtub/subtool/releases/tag/v0.1.6) on Tue Oct 29 2013 09:47:58 GMT+0100 (CET).*  
