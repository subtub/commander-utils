/**
 * Module dependencies.
 */
var request = require('request');
var shell = require('shelljs/global');
var semver = require('semver');
var clc = require('cli-color');

/**
 * The Constructor.
 *
 * @param commander - The commander.js program.
 * @param packageJson - The package.json of the project.
 */
function CommanderUtils(commander, packageJson) {
  this.commander = commander;
  this.pkg = packageJson;
}

module.exports = CommanderUtils;

/**
 * Set the commander.js program version.
 * If no param version is set, use the package.json version.
 *
 * @param version
 */
CommanderUtils.prototype.setVersion = function(version) {
  if (version !== undefined && version === 'string') {
    this.commander.version(version);  
    return version;
  }
  else {
    this.commander.version(this.pkg.version);
    return this.pkg.version;
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
CommanderUtils.prototype.commandUpdate = function(config) {
  var self = this;

  var currentVersion = this.pkg.version;
  config.name = config.name || this.pkg.name;

  self.commander
    .command('update')
    .description('update the '+config.name)
    .option('-c, --check', 'check if a new version is available')
    .action(function(options) {
      self.requestPackageJson(config.packageJsonUrl, function(data) {
        var latestVersion = data.version;
        if (options.check) {
          self.checkIfNewVersion(currentVersion, latestVersion);
        } else {
          if (self.checkIfNewVersion(currentVersion, latestVersion)) {
            exec('sudo npm uninstall -g '+config.name);
            exec('sudo npm install -g '+config.downloadUrl);
          }
        }
      });
    });
};

/**
 * We need the latest package.json.
 * Lets request in from url and return it as object.
 *
 * @param url
 */
CommanderUtils.prototype.requestPackageJson = function(url, callback) {
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
 * Check if a new version was released.
 *
 * @param currentVersion
 * @param latestVersion
 */
CommanderUtils.prototype.checkIfNewVersion = function(currentVersion, latestVersion) {
  if (currentVersion === latestVersion) {
    console.log('You have the latest version installed.');
    return false;
  }
  else if (semver.lt(currentVersion, latestVersion)) {
    console.log('A new version exists.');
    return true;
  }
};

/**
 * If no arguments exist, show help
 */
CommanderUtils.prototype.ifNoArgsShowHelp = function() {
  if (!this.commander.args.length) {
    this.commander.help();
  }
};

/**
 * Print some usage examples to the console.
 *
 * @param exampleCommands - Array
 */
CommanderUtils.prototype.usageExamples = function(exampleCommands) {
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
CommanderUtils.prototype.addLogOptions = function() {
  this.commander
    .option('-S, --silent', 'logger silent mode')
    .option('-N, --colorless', 'logger disable terminal color');
};

/**
 * Check the log options
 */
CommanderUtils.prototype.checkLogOptions = function() {
  if (this.commander.silent) {
    this.log.config.silent = true;
  }
  if (this.commander.colorless) {
    this.log.config.colorless = true;
  }
};

/**
 * The log object.
 */
CommanderUtils.prototype.log = {
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
    //console.log(this.config);
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
