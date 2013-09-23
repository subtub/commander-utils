var assert = require('assert');
var shell = require('shelljs/global');


describe('example/sample', function() {
  
  var path = 'node '+process.cwd()+'/example/sample ';

  it('execute the sample cli without command or option.', function() {
    exec(path);
  })
  it('execute the sample cli with --help option.', function() {
    exec(path+'--help');
  })
  it('execute the sample cli with --version option.', function() {
    exec(path+'--version');
  })
  it('execute the sample cli with --subtub option.', function() {
    exec(path+'--subtub');
  })
  it('execute the sample cli with --subtub and --silent option.', function() {
    exec(path+'--subtub --silent');
  })
  it('execute the sample cli with --subtub and --colorless option.', function() {
    exec(path+'--subtub --colorless');
  })

})
