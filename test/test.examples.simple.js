var assert = require('assert');
var shell = require('shelljs/global');


var path = 'node '+process.cwd()+'/examples/simple ';


describe('examples/simple', function() {

  it('execute the simple cli without command or option.', function() {
    assert.equal(0, exec(path).code);
  });

  it('execute the simple cli with --help option.', function() {
    assert.equal(0, exec(path+'--help').code);
  });
  
  it('execute the simple cli with --version option.', function() {
    assert.equal(0, exec(path+'--version').code);
  });
  
  it('execute the simple cli with --foo option.', function() {
    assert.equal(0, exec(path+'--foo').code);
  });
  
  it('execute the simple cli with --foo and --silent option.', function() {
    assert.equal(0, exec(path+'--foo --silent').code);
  });
  
  it('execute the simple cli with --foo and --colorless option.', function() {
    assert.equal(0, exec(path+'--foo --colorless').code);
  });

});
