/**
 * Module dependencies.
 */
var update = require('./update');


/**
 * The Constructor.
 *
 * @param {Object} commander The commander.js program.
 * @param {Object} packageJson The package.json of the project.
 */
var CommanderUtils = function(commander, packageJson) {
  // We need a temporary object to store some data.
  var tmp = {
    // Set the commander.js program version.
    version: null,
    // 
    versionLong: '',
    // Add a small description about the tool to the help page.
    description: null,
    examples: null,
    bugs: null,
    update: false
  };
  // If the packageJson parameter is defined, set some tmp variables.
  if (packageJson !== undefined) {
    tmp.version = packageJson.version;
    tmp.description = packageJson.description;
    if (packageJson.bugs !== undefined && packageJson.bugs.url !== undefined) {
      tmp.bugs = packageJson.bugs.url;
    };
  };

  /**
   * Parse the commands and options. The `program.parse` function is included at this function.
   *
   * **Example**
   * {{include:/docs/api_example_parseUtils.md}}
   *
   * @returns {Commander} The commander object.
   */
  commander.parseUtils = function(argv) {
    // Add the log options to the commander.js program.
    commander.option('-S, --silent', 'logger silent mode')
             .option('-N, --colorless', 'logger disable terminal color');

    // The update command.
    // Request the latest package.json and check if a new version was released.
    // If a new version is available, uninstall the old one and install the latest one.
    if (tmp.update !== undefined && tmp.update !== false) {
      commander
        .command('update')
        .description('update the '+tmp.update.name)
        .option('-c, --check', 'check if a new version is available')
        .action(function(options) {
          var tmpConfig = {
            packageJsonUrl: tmp.update.packageJsonUrl,
            version: tmp.version,
            name: tmp.update.name,
            downloadUrl: tmp.update.downloadUrl
          };
          update.requestAndCheck(commander, tmpConfig, options, function(data) {
            
          });
        });
    }

    // Add the version.
    if (tmp.versionLong === '') {
      commander.version(tmp.version);
    } else {
      commander.version(tmp.versionLong);
    }

    // Add some information to the main --help page.
    if (tmp.description !== null || tmp.examples !== null) {
      
      commander.on('--help', function() {
        if (tmp.description !== null) {
          // The description header
          console.log('  Description:\n');
          // split the message and print out each line.
          //var str = message.toString();
          var split = tmp.description.split('\n');
          for (var i=0; i<split.length; i++) {
            if (split[i] !== undefined) {
              console.log('    '+split[i]);
            }
          }
          // Description Footer
          console.log();
        }
        if (tmp.examples !== null) {
          console.log('  Examples:\n');
          for (var e=0; e<tmp.examples.length; e++) {
            console.log('    # '+tmp.examples[e].description);
            console.log('    $ '+tmp.examples[e].command);
          };
        };
        if (tmp.bugs !== null) {
          console.log('\n  Report bugs to <'+tmp.bugs+'>\n');
        };
      });

      //mainHelp(commander, tmp.description, tmp.bugs);
    }
    
    // commander.js parse
    commander.parse(argv);

    // If no arguments exist, show help
    if (argv.length === 2) {
      commander.help();
    }

    // Check the log options
    if (commander.silent) {
      this.log.config.silent = true;
    }
    if (commander.colorless) {
      this.log.config.colorless = true;
    }

    return commander;
  };

  /**
   * Set a long version of the cli tool. So we can add a codename or some other stuff.
   * If no long version was set, we use the `package.json` version.
   *
   * **Example**
   * <pre>program.setVersionLong('v1.0.0 codename Release1');</pre>
   *
   * @param {String} versionLong A long version.
   * @returns {Commander} The commander.js object.
   */
  commander.setVersionLong = function(versionLong) {
    tmp.versionLong = versionLong;
    return commander;
  };

  /**
   * Set the description of the cli tool.
   * If no description was set, we use the `package.json` description.
   *
   * **Example**
   * <pre>program.setDescription('v1.0.0 codename Release1');</pre>
   *
   * @param {String} description The project description.
   * @returns {Commander} The commander.js object.
   */
  commander.setDescription = function(description) {
    tmp.description = description;
    return commander;
  };

  /**
   * Add examples to the main --help output.
   *
   * **Example**
   * {{include:/docs/api_example_addExamples.md}}
   *
   * @param {Object} The example as object.
   * @returns {Commander} The commander.js object.
   */
  commander.addExamples = function(obj) {
    tmp.examples = obj;
    return commander;
  };


  /**
   * Set the update settings for the cli tool.
   *
   * **Example**
   * <pre>program.setUpdate('v1.0.0 codename Release1');</pre>
   *
   * @param {Object} update The update configuration.
   * @returns {Commander} The commander.js object.
   */
  commander.setUpdate = function(update) {
    tmp.update = update;
    return commander;
  };

  /**
   * Print out an usage description for an option or command.
   *
   * **Example**
   * {{include:/docs/api_example_commandExample.md}}
   *
   * @param {Object} config The example snippets we want to print out.
   */
  commander.commandExample = function(config) {
    if (config !== undefined) {
      var content = '';
      if (config.description !== undefined) {
        content += '  Description:\n\n';
        var tmp = config.description.split('\n');
        for (var i=0; i<tmp.length; i++) {
          content += '    '+tmp[i]+'\n';
        }
        content += '\n';
      }
      // Print some usage examples to the console.
      if (config.examples !== undefined) {
        content += '  Usage Examples:\n';
        for (var x=0; x<config.examples.length; x++) {
          if (config.examples[x].command !== undefined) {
            if (config.examples[x].description !== undefined) {
              var descriptionSplitted = config.examples[x].description.split('\n');
              for (var j=0; j<descriptionSplitted.length; j++) {
                content += '    # '+descriptionSplitted[j]+'\n';
              }
            }
            content += '    $ '+config.examples[x].command+'\n\n';
          }
        }
      }
      console.log(content);
      return content;
    }
  };

  /**
   * The log object.
   */
  commander.log = {
    // Log configuration.
    config: {
      silent: false,
      colorless: false
    },

    /**
     * Set the log silent boolean
     *
     * **Example**
     * <pre>program.log.setSilent(false);</pre>
     *
     * @function log.setSilent
     * @param {Boolean} silent
     * @returns {Object} The log config object.
     */
    setSilent: function(silent) {
      this.config.silent = silent;
      return this.config;
    },

    /**
     * Set the log colorless boolean
     *
     * **Example**
     * <pre>program.log.setColorless(false);</pre>
     *
     * @function log.setColorless
     * @param {Boolean} colorless
     * @returns {Object} The log config object.
     */
    setColorless: function(colorless) {
      this.config.colorless = colorless;
      return this.config;
    },

    /**
     * Log a info message.
     *
     * **Example**
     * <pre>program.log.info('hello world');</pre>
     *
     * @function log.info
     * @param {String} message The message we want to log.
     * @returns {String} The message we set at this function.
     */
    info: function(message) {
      if (this.config.silent === false) {
        if (this.config.colorless === false) {
          console.log(ansi.green(message));
        } else {
          console.log(message);
        }
      }
      return message;
    },

    /**
     * Log a warn message.
     *
     * **Example**
     * <pre>program.log.warn('hello warn');</pre>
     *
     * @function log.warn
     * @param {String} message The message we want to log.
     * @returns {String} The message we set at this function.
     */
    warn: function(message) {
      if (this.config.colorless === false) {
        console.log(ansi.yellow(message));
      } else {
        console.log(message);
      }
      return message;
    },

    /**
     * Log an error message.
     *
     * **Example**
     * <pre>program.log.error('hello error');</pre>
     *
     * @function log.error
     * @param {String} message The message we want to log.
     * @returns {String} The message we set at this function.
     */
    error: function(message) {
      if (this.config.colorless === false) {
        console.log(ansi.red(message));
      } else {
        console.log(message);
      }
      return message;
    },
  };

};

module.exports = CommanderUtils;

/**
 * Some ANSI Escape codes we want to use.
 */
var ansi = {
  reset: function() {
    return '\033[0m';
  },
  bold: function(message) {
    return '\033[1m'+message+this.reset();
  },
  black: function(message) {
    return '\033[30m'+message+this.reset();
  },
  red: function(message) {
    return '\033[31m'+message+this.reset();
  },
  green: function(message) {
    return '\033[32m'+message+this.reset();
  },
  yellow: function(message) {
    return '\033[33m'+message+this.reset();
  },
  blue: function(message) {
    return '\033[34m'+message+this.reset();
  },
  magenta: function(message) {
    return '\033[35m'+message+this.reset();
  },
  cyan: function(message) {
    return '\033[36m'+message+this.reset();
  },
  white: function(message) {
    return '\033[37m'+message+this.reset();
  }
};
