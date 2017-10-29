let a = document.createElement("a");

function createLocation(path, state) {
  a.href = path || location.href;

  return {
    state: state || null,
    pathname:
      "/" +
      (a.pathname || location.pathname)
        .split("/")
        .filter(Boolean)
        .join("/"),
    search: a.search,
    hash: a.hash,
    key:
      path &&
      Math.random()
        .toString(36)
        .substr(2, 5)
  };
}

export default function createHistory() {
  let listeners = [],
    location = createLocation(),
    entries = [location],
    action;

  function callListeners() {
    listeners.forEach(listener => listener(location, action));
  }

  function handlePopState(e) {
    location = e.state || entries[0];
    action = "POP";
    callListeners();
  }

  return {
    get length() {
      return entries.length;
    },
    get location() {
      return location;
    },
    get action() {
      return action;
    },
    listen(listener) {
      listeners.push(listener);

      if (listeners.length === 1) {
        addEventListener("popstate", handlePopState, false);
      }

      return () => {
        listeners.splice(listeners.indexOf(listener), 1);

        if (!listeners.length) {
          removeEventListener("popstate", handlePopState);
        }
      };
    },
    push(path, state) {
      location = createLocation(path, state);
      entries.push(location);
      history.pushState(location, null, path);
      action = "PUSH";
      callListeners();
    },
    replace(path, state) {
      location = createLocation(path, state);
      entries.pop();
      entries.push(location);
      history.replaceState(location, null, path);
      action = "REPLACE";
      callListeners();
    },
    go(i) {
      history.go(i);
    },
    back() {
      history.back();
    },
    forward() {
      history.forward();
    }
  };
}
