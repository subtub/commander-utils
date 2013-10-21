var assert = require('assert');
var program = require('commander');
var CommanderUtils = require('./../lib/index');
var pkg = require('./../package.json');
CommanderUtils(program, {
  packageJson: pkg
});


describe('lib/index.js', function() {
    
  describe('#commandExample()', function() {
    it('should return the example string.', function() {
      var result = program.commandExample({  
        description: 'description of the command you want to display.',  
        examples: [{description: 'description of the example',
                    command:     'cli cmd -o'}]
      })
      var expected = '  Description:\n\n'+
                     '    description of the command you want to display.\n\n'+
                     '  Usage Examples:\n'+
                     '    # description of the example\n'+
                     '    $ cli cmd -o\n\n';
      assert.equal( expected, result );
    });
    it('should return the example string (multiple lines at the main description and two or more examples).', function() {
      var result = program.commandExample({  
        description: 'description of the command you want to display.\nAlso works with multiple lines.',  
        examples: [{description: 'description one',
                    command:     'cli cmd1 -o'},
                   {description: 'description two',
                    command:     'cli cmd2 -o'}]
      })
      var expected = '  Description:\n\n'+
                     '    description of the command you want to display.\n'+
                     '    Also works with multiple lines.\n\n'+
                     '  Usage Examples:\n'+
                     '    # description one\n'+
                     '    $ cli cmd1 -o\n\n'+
                     '    # description two\n'+
                     '    $ cli cmd2 -o\n\n';
      assert.equal( expected, result );
    });
  });

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
