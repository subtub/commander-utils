/**
 * Module dependencies.
 */
var request = require('request');
var semver = require('semver');

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
CommanderUtils.prototype.version = function() {
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
    .action(function() {
      // we need the latest package.json.
      // lets request in from the github repository
      request(config.packageJsonUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // Check if a new version was released.
          var latestPackageJson = JSON.parse(body);
          if (currentVersion === latestPackageJson.version) {
            console.log('You have the latest version installed.');
          }
          else if (semver.lt(currentVersion, latestVersion)) {
            console.log('A new version exists. Start Installing the new release.');
            exec('sudo npm uninstall -g '+config.name);
            exec('sudo npm install -g '+config.installUrl)
          }
        }
      })
    });
};

/**
 * If no command exist, show help
 */
CommanderUtils.prototype.ifNoCommandShowHelp = function() {
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
  console.log('  Usage Examples:');
  console.log();
  for (var i=0; i<exampleCommands.length; i++) {
    if (exampleCommands[i].description !== undefined) {
      console.log('    # '+exampleCommands[i].description);
    };
    if (exampleCommands[i].command !== undefined) {
      //console.log(infoColor('    $ '+exampleCommands[i].command));
      console.log('    $ '+exampleCommands[i].command);
    };
    console.log();
  };
};
