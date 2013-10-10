var assert = require('assert');
var shell = require('shelljs/global');


var path = 'node '+process.cwd()+'/examples/detailed ';


describe('examples/detailed', function() {

  it('execute the detailed cli without command or option.', function() {
    assert.equal(0, exec(path).code);
  });

  it('execute the detailed cli with `update` command and --help option.', function() {
    assert.equal(0, exec(path+'update --help').code);
  });

  it('execute the detailed cli with `update` command and --check option.', function() {
    assert.equal(0, exec(path+'update --check').code);
  });

  it('execute the detailed cli with `subtub` command.', function() {
    assert.equal(0, exec(path+'subtub').code);
  });

  it('execute the detailed cli with `subtub` command and --help option.', function() {
    assert.equal(0, exec(path+'subtub --help').code);
  });

  it('execute the detailed cli with `subtub` command and --foo option.', function() {
    assert.equal(0, exec(path+'subtub --foo').code);
  });

  it('execute the detailed cli with `subtub` command and --bar option.', function() {
    assert.equal(0, exec(path+'subtub --bar').code);
  });

  it('execute the detailed cli with --baz option.', function() {
    assert.equal(0, exec(path+'--baz').code);
  });

});
