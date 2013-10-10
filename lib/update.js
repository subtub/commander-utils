/**
 * commander-utils update.js
 */


/**
 * Module dependencies.
 */
var semver = require('semver');

/**
 * Check if a new version was released.
 *
 * @param currentVersion
 * @param latestVersion
 */
exports.checkIfNewVersion = function(currentVersion, latestVersion) {
  if (currentVersion === latestVersion) {
    console.log('You have the latest version installed.');
    return false;
  }
  else if (semver.lt(currentVersion, latestVersion)) {
    console.log('A new version exists.');
    return true;
  }
};
