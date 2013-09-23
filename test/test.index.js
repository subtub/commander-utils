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

  describe('#log()', function() {
    describe('#setSilent()', function() {
      it('should return true.', function() {
        programUtils.log.setSilent(true);
        assert.equal( true, programUtils.log.config.silent );
      })
      it('should return false.', function() {
        programUtils.log.setSilent(false);
        assert.equal( false, programUtils.log.config.silent );
      })
    })
    describe('#setColorless()', function() {
      it('should return true.', function() {
        programUtils.log.setColorless(true);
        assert.equal( true, programUtils.log.config.colorless );
      })
      it('should return false.', function() {
        programUtils.log.setColorless(false);
        assert.equal( false, programUtils.log.config.colorless );
      })
    })
    describe('#info()', function() {
      it('should return the log message.', function() {
        assert.equal( 'hello world', programUtils.log.info('hello world') );
      })
    })
  })

})
