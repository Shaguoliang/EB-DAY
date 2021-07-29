var env = 'online';
var debugReg = /192.168|localhost|debug.|127.0|testteach.lyced.com|test/
var debugReg2 = /106.15.55.131|stagingteach.lyced.com|stagZF/
var hostname = location.href;

if (debugReg.test(hostname)) {
  env = 'test';
} else if (debugReg2.test(hostname)) {
  env = 'prerelease';
  // preUrl = 'http://'
}
env = 'online';
var config = {}

if (env == 'test') {
  //测试环境
  config = {
    loginUrl: "http://swapi.mcutec.com/web/",
  }
} else {
  config = {
    loginUrl: "http://swapi.mcutec.com/web/",
  }
}

export default config;