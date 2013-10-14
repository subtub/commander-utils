var assert = require('assert');
var update = require('../lib/update');
var pkg = require('../package.json');


var pkgJsonOlder   = 'https://raw.github.com/subtub/commander-utils/master/test/files/package_older.json';
var pkgJsonNewer   = 'https://raw.github.com/subtub/commander-utils/master/test/files/package_newer.json';
var pkgJsonCurrent = 'https://raw.github.com/subtub/commander-utils/master/package_newer.json';
var pkgJsonFail    = 'https://raw.github.com/subtub/commander-utils/master/test/files/package_fail.json';


describe('lib/update.js', function() {
  
  describe('#checkIfNewVersion(currentVersion, latestVersion)', function() {
    it('should return false if the versions are the same.', function() {
      assert.equal(false, update.checkIfNewVersion('1.0.0', '1.0.0').state);
    });
    it('should return true if a new version was released.', function() {
      assert.equal(true, update.checkIfNewVersion('1.0.0', '2.0.0').state);
    });
  });

  describe('#requestAndCheck()', function() {
    it('should return false if the request failed (url not valid).', function() {
      update.requestAndCheck(pkgJsonFail, pkg, {check: true}, function(data) {
        console.log(data);
        assert.equal(false, data);
      });
    });
    it('should return true (newer).', function() {
      update.requestAndCheck(pkgJsonNewer, pkg, {check: true}, function(data) {
        assert.equal(true, data);
      });
    });
    it('should return true (older).', function() {
      update.requestAndCheck(pkgJsonOlder, pkg, {check: true}, function(data) {
        assert.equal(false, data);
      });
    });
    it('should return true (current).', function() {
      update.requestAndCheck(pkgJsonCurrent, pkg, {check: true}, function(data) {
        assert.equal(false, data);
      });
    });
  });

});
