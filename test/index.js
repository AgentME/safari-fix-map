var assert = require('assert');
var loader = require('./lib/loader')(require.resolve);

describe("safari-fix-map", function() {
  global.window = null;
  global.navigator = {};

  it("banishes Safari's Map for one that won't backstab us", function() {
    global.window = {Map: 1, Set: 2};
    global.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.1.17 (KHTML, like Gecko) Version/7.1 Safari/537.85.10';
    loader.run('../index');
    assert.equal(typeof window.Map, 'function');
    assert.equal(typeof window.Set, 'function');
  });

  it("approvingly nods at Chrome's Map", function() {
    global.window = {Map: 1, Set: 2};
    global.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36';
    loader.run('../index');
    assert.deepEqual(window, {Map: 1, Set: 2});
  });

  it("trusts Firefox's Map unconditionally", function() {
    global.window = {Map: 1, Set: 2};
    global.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:36.0) Gecko/20100101 Firefox/36.0';
    loader.run('../index');
    assert.deepEqual(window, {Map: 1, Set: 2});
  });

  it("doesn't worry about Browsers that don't pretend to have working Maps", function() {
    global.window = {};
    global.navigator.userAgent = 'beep boop 1.2';
    loader.run('../index');
    assert.deepEqual(window, {});
  });
});
