/**
 * Module dependencies.
 */
var request = require('request');
//var shell = require('shelljs/global');
var exec = require('child_process').exec;
var semver = require('semver');


/**
 * The Constructor.
 *
 * @param commander - The commander.js program.
 * @param packageJson - The package.json of the project.
 */
var CommanderUtils = function(commander, packageJson) {

  /**
   *
   */
  commander.initUtils = function(config) {
    // Set the commander.js program version.
    // if no config.version is set, use the package.json version.
    if (config !== undefined && config.version !== undefined) {
      commander.version(config.version);
    } else {
      commander.version(packageJson.version);
    }

    // Add a small description about the tool to the help page.
    if (config !== undefined && config.description !== undefined) {
      commander.on('--help', function() {
        console.log('  Description:');
        console.log();
        console.log('    '+config.description);
        console.log();
      });
    } else {
      commander.on('--help', function() {
        console.log('  Description:');
        console.log();
        console.log('    '+packageJson.description);
        console.log();
      });
    }

    // Add the log options to the commander.js program.
    commander.option('-S, --silent', 'logger silent mode')
             .option('-N, --colorless', 'logger disable terminal color');
    
    // The update command.
    // Request the latest package.json and check if a new version was released.
    // If a new version is available, uninstall the old one and install the latest one.
    if (config !== undefined && config.update !== undefined) {
      commander
        .command('update')
        .description('update the '+config.name)
        .option('-c, --check', 'check if a new version is available')
        .action(function(options) {
          // We need the latest package.json.
          // Lets request in from url and return it as object.
          // TODO: use node.js request function and remove the request module from the project.
          request(config.update.packageJsonUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var latestVersion = JSON.parse(body).version;
              if (options.check) {
                checkIfNewVersion(packageJson.version, latestVersion);
              } else {
                if (checkIfNewVersion(packageJson.version, latestVersion)) {
                  // TODO: use native node.js (child_process...)
                  //var uninstall = exec('sudo npm uninstall', ['-g', config.name]);
                  //exec('sudo npm uninstall -g '+config.name);
                  //var install = exec('sudo npm install', ['-g', config.downloadUrl]);
                  //exec('sudo npm install -g '+config.downloadUrl);
                }
              } 
            } else {
              console.log('Cannot request the latest package.json');
            }
          });
        });
    }

    return commander;
  };

  /**
   *
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
   * Parse the commands and options.
   */
  commander.parseUtils = function() {
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
   * The log object.
   */
  commander.log = {
    // Log configuration.
    config: {
      silent: false,
      colorless: false
    },

    /**
     * Set the silent mode.
     *
     * @param b - 
     */
    setSilent: function(b) {
      this.config.silent = b;
    },

    /**
     * @function log.info
     * @param {String} [message] The message we want to log.
     * @returns {String} The message we set at this function.
     *
     * Log a info message.
     *
     * **Example**
     * <pre>program.log.info('hello world');</pre>
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
     * @function log.warn
     *
     * Log a warn message.
     *
     * **Example**
     * <pre>program.log.warn('hello warn');</pre>
     *
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
 * Check if a new version was released.
 *
 * @param currentVersion
 * @param latestVersion
 */
function checkIfNewVersion(currentVersion, latestVersion) {
  if (currentVersion === latestVersion) {
    console.log('You have the latest version installed.');
    return false;
  }
  else if (semver.lt(currentVersion, latestVersion)) {
    console.log('A new version exists.');
    return true;
  }
}

