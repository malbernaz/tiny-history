# tiny-history [![npm version](https://badge.fury.io/js/tiny-history.svg)](https://badge.fury.io/js/tiny-history) [![Build Status](https://travis-ci.org/malbernaz/tiny-history.svg?branch=master)](https://travis-ci.org/malbernaz/tiny-history) [![Build Status](https://saucelabs.com/buildstatus/malbernaz)](https://saucelabs.com/beta/builds/126cf589faff497d998c4bb515345011)

[![Build Status](https://saucelabs.com/browser-matrix/malbernaz.svg)](https://saucelabs.com/beta/builds/126cf589faff497d998c4bb515345011)

tiny-history is a simple wrapper around the browser history api. It was inspired by and to some extent it mimics the behaviour of [history](https://github.com/ReactTraining/history), a package created by the same folks that made [react-router](https://github.com/ReactTraining/react-router).

The main differences from it are that tiny-history doesn't normalize paths and basename and trasition blocking are not supported.

## Why to use this

tiny-history's main selling point is it's size (600B minified and gzipped).

## Usage

```js
import createHistory from "tiny-history":

const history = createHistory();

function doSomething(location, action) {
  /* do something */
}

// register a listener for route transitions
const unlisten = history.listen(doSomething);

// push a new route
history.push("pushed");

// replace a route
history.replace("replaced");

// transition to the previous route
history.back();

// transition to the next route
history.forward();

// transition to an entry of the history based on the index passed
history.go(-1);

// history.listen returns a callback that detaches the listener passed to it
unlisten();
```

Brower builds are also available on [unpkg](https://unpkg.com):

```html
<!-- iife -->
<script src=https://unpkg.com/tiny-history/tiny-history.js></script>

<!-- esm -->
<script type=module src=https://unpkg.com/tiny-history/tiny-history.js></script>
```

## LICENSE

[MIT](https://github.com/malbernaz/tiny-history/blob/master/LICENSE)
