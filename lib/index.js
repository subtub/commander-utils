/**
 * commander.js utility functions.
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
