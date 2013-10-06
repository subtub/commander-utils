/**
 * Module dependencies.
 */
var request = require('request');
//var shell = require('shelljs/global');
var exec = require('child_process').exec;
var semver = require('semver');
var clc = require('cli-color');


/**
 * The Constructor.
 *
 * @param commander - The commander.js program.
 * @param packageJson - The package.json of the project.
 */
var CommanderUtils = function(commander, config) {

  // Some variable we need.
  var pkg = config.packageJson;

  /**
   * Set the commander.js program version.
   * If no param version is set, use the package.json version.
   *
   * @param version
   */
  commander.setVersion = function(version) {
    if (version !== undefined) {
      commander.version(version);
      return version;
    }
    else {
      commander.version(pkg.version);
      return pkg.version;
    }
  };

  /**
   * The update command.
   *
   * Request the latest package.json and check if a new version was released.
   * If a new version is available, uninstall the old one and install the latest one.
   *
   * @param config
   */
  commander.addUpdateCommand = function(config) {
    // var self = this;

    // var currentVersion = this.pkg.version;
    // config.name = config.name || this.pkg.name;

    // self.commander
    //   .command('update')
    //   .description('update the '+config.name)
    //   .option('-c, --check', 'check if a new version is available')
    //   .action(function(options) {
    //     self.requestPackageJson(config.packageJsonUrl, function(data) {
    //       var latestVersion = data.version;
    //       if (options.check) {
    //         self.checkIfNewVersion(currentVersion, latestVersion);
    //       } else {
    //         if (self.checkIfNewVersion(currentVersion, latestVersion)) {
    //           var uninstall = exec('sudo npm uninstall', ['-g', config.name]);
    //           // TODO: use native node.js (child_process...)
    //           // exec('sudo npm uninstall -g '+config.name);
    //           //var install = exec('sudo npm install', ['-g', config.downloadUrl]);
    //           // exec('sudo npm install -g '+config.downloadUrl);

    //         }
    //       }
    //     });
    //   });
  };

  /**
   * We need the latest package.json.
   * Lets request in from url and return it as object.
   *
   * @param url
   */
  commander.requestPackageJson = function(url, callback) {
    // TODO: use node.js request function and remove the request module from the project.
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var tmp = JSON.parse(body);
        return callback(tmp);
      } else {
        return false;
      }
    });
  };

  /**
   * If no arguments exist, show help
   */
  commander.ifNoArgsShowHelp = function() {
    if (process.argv.length === 2) {
      commander.help();
    }
  };

  /**
   * Print some usage examples to the console.
   *
   * @param exampleCommands - Array
   */
  commander.usageExamples = function(exampleCommands) {
    this.log.info('  Usage Examples:\n');
    for (var i=0; i<exampleCommands.length; i++) {
      if (exampleCommands[i].description !== undefined) {
        this.log.info('    # '+exampleCommands[i].description);
      }
      if (exampleCommands[i].command !== undefined) {
        this.log.info('    $ '+exampleCommands[i].command+'\n');
      }
    }
  };

  /**
   * Add the log options to the commander.js program.
   */
  commander.addLogOptions = function() {
    commander
      .option('-S, --silent', 'logger silent mode')
      .option('-N, --colorless', 'logger disable terminal color');
  };

  /**
   * Check the log options
   */
  commander.checkLogOptions = function() {
    if (commander.silent) {
      this.log.config.silent = true;
    }
    if (commander.colorless) {
      this.log.config.colorless = true;
    }
  };

  /**
   * The log object.
   */
  commander.log = {
    /**
     * Log configuration.
     */
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
     * Set the color mode.
     *
     * @param b - 
     */
    setColorless: function(b) {
      this.config.colorless = b;
    },
    
    /**
     * Log a info message.
     *
     * @param message - 
     */
    info: function(message) {
      if (this.config.silent === false) {
        if (this.config.colorless === false) {
          console.log(clc.yellow(message));
        } else {
          console.log(message);
        }
      }
      return message;
    }
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

 * Check if a new version was released.
 *
 * @param currentVersion
 * @param latestVersion
 * @api private
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

