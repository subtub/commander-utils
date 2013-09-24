var assert = require('assert');
var program = require('commander');
var CommanderUtils = require('./../lib/index');
var pkg = require('./../package.json');
var programUtils = new CommanderUtils(program, pkg);


describe('lib/index.js', function() {
  
  describe('#setVersion()', function() {
    it('should return the version set at package.json.', function() {
      assert.equal( pkg.version, programUtils.setVersion() );
    })
    it('should return the version from the parameter.', function() {
      assert.equal( pkg.version, programUtils.setVersion('1.0.0') );
    })
  })
  })

  describe('#checkIfNewVersion()', function() {
    it('should return true if the cli tool is the latest release.', function() {
      assert.equal( false, programUtils.checkIfNewVersion('1.0.0', '1.0.0') );
    })
    it('should return false if a new release is available.', function() {
      assert.equal( true, programUtils.checkIfNewVersion('1.0.0', '2.0.0') );
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
