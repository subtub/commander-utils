var assert = require('assert');
var shell = require('shelljs/global');


var path = 'node '+process.cwd()+'/examples/basic ';


describe('examples/basic', function() {

  it('execute the basic cli without command or option.', function() {
    assert.equal(0, exec(path).code);
  });

  it('execute the basic cli with --help option.', function() {
    assert.equal(0, exec(path+'--help').code);
  });

});
