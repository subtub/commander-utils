var assert = require('assert');
var program = require('commander');
var CommanderUtils = require('./../lib/index');
var pkg = require('./../package.json');
var programUtils = new CommanderUtils(program, pkg);


describe('lib/index.js', function() {
  
  describe('#setVersion()', function() {
    it('should return the version of the commander.js tool.', function() {
      assert.equal( pkg.version, programUtils.setVersion() );
    })
  })

})
