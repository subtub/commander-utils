/**
 * commander-utils update.js
 */


/**
 * Module dependencies.
 */
var exec = require('child_process').exec;
var request = require('request');
var semver = require('semver');
var prompt = require('prompt');

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
 * Request the package.json and return the version
 */
function requestLatestVersion(url, callback) {
  // We need the latest package.json.
  // Lets request in from url and return it as object.
  // TODO: use node.js request function and remove the request module from the project.
  request(url, function (error, response, body) {
    // If request is successful
    if (!error && response.statusCode == 200) {
      var latestVersion = JSON.parse(body).version;
      callback(latestVersion);
    }
    // If request failed.
    else {
      callback({state: false, message: 'Cannot request the latest package.json'});
    }
  });
}

exports.requestLatestVersion = requestLatestVersion;

/**
 * Request the latest package.json and check the version.
 */
function requestAndCheck(program, config, options, callback) {
  requestLatestVersion(config.packageJsonUrl, function(data) {
    if (data.state !== false) {
      var tmpCheck = checkIfNewVersion(config.version, data);
      if (options.check) {
        console.log(tmpCheck.message);
        //callback(tmpCheck);
      }
      else {
        if (tmpCheck.state) {
          // Start the prompt.
          prompt.start();
          // Get the password.
          prompt.get(['password'], function (err, result) {
            install(config.name, config.downloadUrl, result.password, function(data) {
              console.log('Installation finished!');
            });
          });
        }
      }
    }
    else {
      console.log(data.message);
      callback(false);
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
    console.log('uninstall '+name);
    exec('echo '+password+' | sudo -S npm install -g '+downloadUrl, function(code, output) {
      console.log('install '+name);
      callback({code: code});
    });
  });
}

exports.install = install;
