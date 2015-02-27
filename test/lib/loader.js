var _ = require("lodash");
var assert = require("assert");

module.exports = function(resolve) {
  return {
    // Executes a javascript file, even if it has been run before.
    run: function(name) {
      var rname = resolve(name);
      delete require.cache[rname];
      require(rname);

      // check that the module was added to the cache where we expected it, so
      // that we can be sure that we removed it.
      assert(_.has(require.cache, rname), 'check module in cache');
      delete require.cache[rname];
    }
  };
};
