var assert = require('assert');
var update = require('../lib/update');


describe('lib/update.js', function() {

  describe('#checkIfNewVersion()', function() {
    it('should return false if the versions are the same.', function() {
        assert.equal( false, update.checkIfNewVersion('1.0.0', '1.0.0') );
    });
    it('should return true if a new version was released.', function() {
        assert.equal( true, update.checkIfNewVersion('1.0.0', '2.0.0') );
    });
  });

});
