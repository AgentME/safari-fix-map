if (
  typeof navigator !== 'undefined' &&
  window.Map &&
  navigator.userAgent.indexOf("Safari") > -1 &&
  navigator.userAgent.indexOf('Chrome') == -1
) {
  delete window.Map;
  delete window.Set;
  // I haven't actually seen issues with Set, but I assume it's probably
  // implemented on top of Map so I'm playing it safe here.

  window.Map = require('core-js/library/fn/map');
  window.Set = require('core-js/library/fn/set');
}
