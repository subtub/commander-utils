var assert = require('assert');
var program = require('commander');
var update = require('../lib/update');
var pkgVersion = require('../package.json').version;


var urlPackageJsonOlder   = 'https://raw.github.com/subtub/commander-utils/master/test/files/package_older.json';
var urlPackageJsonNewer   = 'https://raw.github.com/subtub/commander-utils/master/test/files/package_newer.json';
var urlPackageJsonCurrent = 'https://raw.github.com/subtub/commander-utils/master/package.json';
var urlPackageJsonFail    = 'https://not/correct/url';


describe('lib/update.js', function() {
  
  describe('#checkIfNewVersion(currentVersion, latestVersion)', function() {
    it('should return false if the versions are the same.', function() {
      assert.equal(false, update.checkIfNewVersion('1.0.0', '1.0.0').state);
    });
    it('should return true if a new version was released.', function() {
      assert.equal(true, update.checkIfNewVersion('1.0.0', '2.0.0').state);
    });
  });

  describe('#requestLatestVersion()', function() {
    it('should return the version.', function() {
      update.requestLatestVersion(urlPackageJsonOlder, function(data) {
        assert.equal('0.0.0', data);
      });
    });
    it('should return the version.', function() {
      update.requestLatestVersion(urlPackageJsonNewer, function(data) {
        assert.equal('99.0.0', data);
      });
    });
    it('should return false.', function() {
      update.requestLatestVersion(urlPackageJsonFail, function(data) {
        assert.equal(false, data.state);
      });
    });
  });

  describe('#requestAndCheck()', function() {
    it('should return false if the request failed (url not valid).', function() {
      update.requestAndCheck(program, {packageJsonUrl: urlPackageJsonFail, version: pkgVersion}, {check: true}, function(data) {
        assert.equal(false, data);
      });
    });
    it('should return true (newer).', function() {
      update.requestAndCheck(program, {packageJsonUrl: urlPackageJsonNewer, version: pkgVersion}, {check: true}, function(data) {
        assert.equal(true, data);
      });
    });
    it('should return false (older).', function() {
      update.requestAndCheck(program, {packageJsonUrl: urlPackageJsonOlder, version: pkgVersion}, {check: true}, function(data) {
        assert.equal(false, data);
      });
    });
    it('should return false (current).', function() {
      update.requestAndCheck(program, {packageJsonUrl: urlPackageJsonCurrent, version: pkgVersion}, {check: true}, function(data) {
        assert.equal(false, data);
      });
    });
  });

});
