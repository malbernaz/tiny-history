# tiny-history [![npm version](https://badge.fury.io/js/tiny-history.svg)](https://badge.fury.io/js/tiny-history) [![Build Status](https://travis-ci.org/malbernaz/tiny-history.svg?branch=master)](https://travis-ci.org/malbernaz/tiny-history) [![Build Status](https://saucelabs.com/buildstatus/malbernaz)](https://saucelabs.com/beta/builds/126cf589faff497d998c4bb515345011) ![](http://img.badgesize.io/malbernaz/tiny-history/master/dist/tiny-history.esm.js.svg?compression=gzip)


[![Build Status](https://saucelabs.com/browser-matrix/malbernaz.svg)](https://saucelabs.com/beta/builds/126cf589faff497d998c4bb515345011)

tiny-history is a simple wrapper around the browser history API. To some extent it mimics the behaviour of [history](https://github.com/ReactTraining/history), a module created by the good folks from [React Training](https://reacttraining.com/). Main differences from it are:

- doesn't normalize paths
- basename is not supported
- transitions blocking is not supported

## Why to use this

tiny-history's main selling point is it's size: ~500B minified and gzipped.

## How to install

```bash
npm i tiny-history

# or

yarn add tiny-history
```

Browser builds are also available on [unpkg](https://unpkg.com):

```html
<!-- iife -->
<script src=https://unpkg.com/tiny-history/tiny-history.js></script>

<!-- esm -->
<script type=module src=https://unpkg.com/tiny-history/tiny-history.esm.js></script>
```

## Usage

```js
import createHistory from "tiny-history";

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

## How to use tiny-history to replace `history`'s `createBrowserHistory`

```js
import createHistory from "tiny-history";

const history = createHistory();

history.goForward = history.forward;

history.goBack = history.back;

export default history;
```

## LICENSE

[MIT](https://github.com/malbernaz/tiny-history/blob/master/LICENSE)
