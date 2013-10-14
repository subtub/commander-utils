/**
 * commander-utils update.js
 */


/**
 * Module dependencies.
 */
var exec = require('child_process').exec;
var request = require('request');
var semver = require('semver');

/**
 * Check if a new version was released.
 *
 * @param currentVersion
 * @param latestVersion
 * @returns object
 */
function checkIfNewVersion(currentVersion, latestVersion) {
  // The object we want to return.
  var tmp = {
    state: null,
    message: null
  };

  // Check versions.
  if (currentVersion === latestVersion) {
    tmp.state = false;
    tmp.message = 'You have the latest version installed.';
  }
  else if (semver.lt(currentVersion, latestVersion)) {
    tmp.state = true;
    tmp.message = 'A new version exists.';
  }

  return tmp;
}

exports.checkIfNewVersion = checkIfNewVersion;

/**
 * Request the latest package.json and check the version.
 */
function requestAndCheck(packageJsonUrl, packageJson, options, callback) {
  // We need the latest package.json.
  // Lets request in from url and return it as object.
  // TODO: use node.js request function and remove the request module from the project.
  request(packageJsonUrl, function (error, response, body) {
    // If request is successful
    if (!error && response.statusCode == 200) {

      var latestVersion = JSON.parse(body).version;
      var tmpCheck = checkIfNewVersion(packageJson.version, latestVersion);

      if (options.check) {
        callback(tmpCheck);
      }
      else {
        if (tmpCheck.state) {
          install(packageJson, options, password, function(data) {
            callback(tmpCheck);
          });
        }
      }
    }
    // If request failed.
    else {
      callback({state: false, message: 'Cannot request the latest package.json'});
    }
  });
}

exports.requestAndCheck = requestAndCheck;

/**
 * Install the new version.
 *
 * @param the name of the npm module.
 * @param downloadUrl The url to download via npm.
 */
function install(name, downloadUrl, password, callback) {
  // TODO: use native node.js (child_process...)
  exec('echo '+password+' | sudo -S npm uninstall -g '+name, function(code, output) {
    console.log(code);
    console.log(output);
    exec('echo '+password+' | sudo -S npm install -g '+downloadUrl, function(code, output) {
      console.log(code);
      console.log(output);
      callback({code: code});
    });
  });
}

exports.install = install;
