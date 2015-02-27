# Safari-Fix-Map

This is a short javascript module that checks whether it is running on Safari,
and if so, deletes `window.Map` and replaces it with a more competent polyfill.

Safari's Map implementation has bugs that causes it to sometimes return
completely wrong objects from its `.get` method. It might have to do with using
Maps in browser extensions or MutationObserver callbacks. I suspect those
aren't well-tested in Safari. I have stared at error stacks and prodded
debuggers to check my sanity. I have looked into the abyss. I have seen this
code fail in Safari 8:

```javascript
function checkMap(map) {
  map.forEach(function(value, key) {
    if (!isNaN(value) && value !== map.get(key)) {
      throw new Error("world is insane at key "+key);
    }
  });
}
```

This module is for people who wish to seal Eldritch horrors securely away.

# Recommended Usage

You're using Browserify and NPM, right?

```
npm i --save safari-fix-map
```

```javascript
require('safari-fix-map');
// Go on with your life in freedom
```
