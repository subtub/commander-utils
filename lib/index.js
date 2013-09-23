/**
 * Module dependencies.
 */
var request = require('request');
var shell = require('shelljs/global');
var semver = require('semver');
var clc = require('cli-color');

/**
 * The Constructor.
 */
function CommanderUtils(commander, packageJson) {
  this.commander = commander;
  this.pkg = packageJson;
}

module.exports = CommanderUtils;

/**
 * Set the version
 */
CommanderUtils.prototype.setVersion = function() {
  this.commander.version(this.pkg.version);
  return this.pkg.version;
};

/**
 * The update command.
 * Request the latest package.json and check if a new version was released.
 * If a new version is available, uninstall the old one and install the latest one.
 */
CommanderUtils.prototype.commandUpdate = function(config) {
  var currentVersion = this.pkg.version;

  config.name = config.name || this.pkg.name;

  this.commander
    .command('update')
    .description('update the '+config.name)
    .option('-c, --check', 'check if a new version is available')
    .action(function(options) {
      if (options.check) {
        console.log('check');
      } else {
        // we need the latest package.json.
        // lets request in from the github repository
        request(config.packageJsonUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var tmp = JSON.parse(body);
            // Check if a new version was released.
            var latestPackageJson = JSON.parse(body);
            if (currentVersion === latestPackageJson.version) {
              console.log('You have the latest version installed.');
            }
            else if (semver.lt(currentVersion, latestVersion)) {
              console.log('A new version exists. Start Installing the new release.');
              exec('sudo npm uninstall -g '+config.name);
              exec('sudo npm install -g '+config.installUrl)   
            };
          };
        });
      }
    });
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
    };
    if (exampleCommands[i].command !== undefined) {
      this.log.info('    $ '+exampleCommands[i].command+'\n');
    };
  };
};

CommanderUtils.prototype.addLogOptions = function() {
  this.commander
    .option('-S, --silent', 'logger silent mode')
    .option('-N, --colorless', 'logger disable terminal color')
};

CommanderUtils.prototype.checkLogOptions = function() {
  if (this.commander.silent) {
    this.log.config.silent = true;
  };
  if (this.commander.colorless) {
    this.log.config.colorless = true;
  };
};

/**
 * The log object.
 */
CommanderUtils.prototype.log = {
  config: {
    silent: false,
    colorless: false
  },

  setSilent: function(b) {
    this.config.silent = b;
  },
  
  setColorless: function(b) {
    this.config.colorless = b;
  },
  
  info: function(message) {
    //console.log(this.config);
    if (this.config.silent === false) {
      if (this.config.colorless === false) {
        console.log(clc.yellow(message));
      } else {
        console.log(message);
      };
    };
    return message;
  }
};
