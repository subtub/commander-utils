var assert = require('assert');
var program = require('commander');
var CommanderUtils = require('./../lib/index');
var pkg = require('./../package.json');
CommanderUtils(program, {
  packageJson: pkg
});


describe('lib/index.js', function() {
  
  // describe('#setVersion()', function() {
  //   it('should return the version set at package.json.', function() {
  //     program.setVersion();
  //     console.log( program.Commander );
  //     assert.equal( '0.0.2', program.Commander );
  //   })
  //   it('should return the version from the parameter.', function() {
  //     assert.equal( '1.0.0', program.setVersion('1.0.0') );
  //   })
  // })

  // describe('#requestPackageJson()', function() {
  //   it('should return the requested package.json as object.', function() {
  //     program.requestPackageJson('https://github.com/subtub/commander-utils/raw/master/package.json', function(data) {
  //       assert.equal( typeof data === 'object', data );
  //     })
  //   })
  //   it('should return false if the request end with an error.', function() {
  //     program.requestPackageJson('not/correct/url', function(data) {
  //       assert.equal( false, data );
  //     })
  //   })
  // })

  describe('#log()', function() {

    describe('#setSilent()', function() {
      it('should return true.', function() {
        program.log.setSilent(true);
        assert.equal( true, program.log.config.silent );
      });
      it('should return false.', function() {
        program.log.setSilent(false);
        assert.equal( false, program.log.config.silent );
      });
    });
    
    describe('#setColorless()', function() {
      it('should return true.', function() {
        program.log.setColorless(true);
        assert.equal( true, program.log.config.colorless );
      });
      it('should return false.', function() {
        program.log.setColorless(false);
        assert.equal( false, program.log.config.colorless );
      });
    });
    
    describe('#info()', function() {
      it('should return the log message.', function() {
        assert.equal( 'hello world', program.log.info('hello world') );
      });
    });

  });

});
