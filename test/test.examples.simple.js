var assert = require('assert');
var shell = require('shelljs/global');


describe('examples/simple', function() {
  
  var path = 'node '+process.cwd()+'/examples/simple ';

  it('execute the sample cli without command or option.', function() {
    exec(path);
  })
  it('execute the sample cli with --help option.', function() {
    exec(path+'--help');
  })
  it('execute the sample cli with --version option.', function() {
    exec(path+'--version');
  })
  it('execute the sample cli with --foo option.', function() {
    exec(path+'--foo');
  })
  it('execute the sample cli with --foo and --silent option.', function() {
    exec(path+'--foo --silent');
  })
  it('execute the sample cli with --foo and --colorless option.', function() {
    exec(path+'--foo --colorless');
  })

})
