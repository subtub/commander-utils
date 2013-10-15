/**
 * Module dependencies.
 */
var update = require('./update');


/**
 * The Constructor.
 *
 * @param commander - The commander.js program.
 * @param packageJson - The package.json of the project.
 */
var CommanderUtils = function(commander, packageJson) {
  // We need a temporary object to store some data.
  var tmp = {
    // Set the commander.js program version.
    version: packageJson.version || '0.0.0',
    // 
    versionLong: 'Version '+this.version,
    // Add a small description about the tool to the help page.
    description: packageJson.description || null,
    update: false
  };

  /**
   * Parse the commands and options.
   *
   * **Example**
   * {{include:/docs/api_example_parseUtils.md}}
   *
   * @returns {Commander} The commander object.
   */
  commander.parseUtils = function() {
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
          update.requestAndCheck(commander, tmpConfig, options, 'Molotow', function(data) {
            
          });
        });
    }

    // Add the version.
    commander
      .version(tmp.version);

    // Add the description to --help page
    if (tmp !== undefined && tmp.description !== undefined) {
      descriptionLog(commander, tmp.description);
    } else {
      descriptionLog(commander, packageJson.description);
    }

    // Check the log options
    if (commander.silent) {
      this.log.config.silent = true;
    }
    if (commander.colorless) {
      this.log.config.colorless = true;
    }

    // If no arguments exist, show help
    if (process.argv.length === 2) {
      commander.help();
    }
    
    return commander;
  };

  /**
   * Set the version (long) of the cli tool.
   *
   * **Example**
   *
   * <pre>program.setVersionLong('v1.0.0 codename Release1');</pre>
   * @param config The example snippets we want to print out.
   */
  commander.setVersionLong = function(versionLong) {
    tmp.versionLong = versionLong;
    return commander;
  };

  /**
   * Set the description of the cli tool.
   *
   * **Example**
   * <pre>program.setDescription('v1.0.0 codename Release1');</pre>
   *
   * @param {String} The project description.
   */
  commander.setDescription = function(description) {
    tmp.description = description;
    return commander;
  };

  /**
   * Set the description of the cli tool.
   *
   * **Example**
   * <pre>program.setDescription('v1.0.0 codename Release1');</pre>
   *
   * @param {Object} The update configuration.
   */
  commander.setUpdate = function(update) {
    tmp.update = update;
    return commander;
  };

  /**
   * Print an usage description for an option or command.
   *
   * **Example**
   * {{include:/docs/api_example_commandExample.md}}
   *
   * @param config The example snippets we want to print out.
   */
  commander.commandExample = function(config) {
    if (config !== undefined) {
      if (config.description !== undefined) {
        console.log('  Description:\n');
        var tmp = config.description.split('\n');
        for (var i=0; i<tmp.length; i++) {
          console.log('    '+tmp[i]);
        }
        console.log();
      }
      // Print some usage examples to the console.
      if (config.examples !== undefined) {
        console.log('  Usage Examples:\n');
        for (var x=0; x<config.examples.length; x++) {
          if (config.examples[x].command !== undefined) {
            if (config.examples[x].description !== undefined) {
              var descriptionSplitted = config.examples[x].description.split('\n');
              for (var j=0; j<descriptionSplitted.length; j++) {
                console.log('    # '+descriptionSplitted[j]);
              }
            }
            console.log('    $ '+config.examples[x].command+'\n');
          }
        }
      }
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
     * @param {String} [message] The message we want to log.
     * @returns {String} The message we set at this function.
     */
    info: function(message) {
      if (this.config.silent === false) {
        if (this.config.colorless === false) {
          console.log(ansi.yellow(message));
        } else {
          console.log(message);
        }
      }
      return message;
    },

    /**
     *
     * Log a warn message.
     *
     * **Example**
     * <pre>program.log.warn('hello warn');</pre>
     *
     * @function log.warn
     * @param {String} [message] The message we want to log.
     * @returns {String} The message we set at this function.
     */
    warn: function(message) {
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

/*
 * Print out the Description Area and add some information to it.
 *
 */
function descriptionLog(commander, message) {
  commander.on('--help', function() {
    // The descriotion header
    console.log('  Description:');
    console.log();

    // split the message and print out each line.
    var str = message.toString();
    var split = str.split('\n');
    for (var i=0; i<message.length; i++) {
      if (split[i] !== undefined) {
        console.log('    '+split[i]);
      }
    }
    
    // Description Footer
    console.log();
  });
  return commander;
}
