var assert = require('assert');
var program = require('commander');
var CommanderUtils = require('./../lib/index');
var pkg = require('./../package.json');
var programUtils = new CommanderUtils(program, pkg);


describe('lib/index.js', function() {
  
  describe('#version()', function() {
    it('should return the version of the commander.js tool.', function() {
      assert.equal( pkg.version, programUtils.version() );
    })
  })

  describe('#getPackageJsonFromUrl()', function() {
    it('should return the package.json object.', function() {
      programUtils.getPackageJsonFromUrl('https://github.com/subtub/commander-utils/raw/master/test/files/package.json', function(data) {
        var result = {
          name: 'test',
          version: '1.0.0'
        };
        assert.equal( result, data );
      })
    })
    
    it('should return false if the url is not correct.', function() {
      programUtils.getPackageJsonFromUrl('not/correct/url', function(data) {
        assert.equal( false, data );
      })
    })
  })

})
