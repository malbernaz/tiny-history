# tiny-history

A simple wrapper around the browser history api. It was inspired by and to some extent it mimics the behaviour of [history](https://github.com/ReactTraining/history), a package created by the same folks that made [react-router](https://github.com/ReactTraining/react-router). The main differences from it is that tiny-history doesn't normalize paths and basename is currently not supported.

## How to use

```js
import History from "tiny-history":

const history = new History();

function doSomething(location, action) {
  /* do something */
}

// push a listener for route transitions
const unlisten = history.listen(doSomething);

// push a new route
history.push("pushed");

// replace a new route
history.replace("replaced");

// transition to the previous route
history.back();

// transition to the next route
history.forward();

// transition to an entry of the history based on the index passed
history.go(-1);

// history.listen returns a callback that detatches the listener passed
unlisten();
```

## LICENSE
[MIT](https://github.com/malbernaz/tiny-history/blob/master/LICENSE)
