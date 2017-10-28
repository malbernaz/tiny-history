function createURL(href) {
  const link = document.createElement("a");
  link.href = href;

  const pathname = link.pathname
    .split("/")
    .filter(Boolean)
    .join("/");

  return {
    pathname: `/${pathname}`,
    search: link.search,
    hash: link.hash
  };
}

function createLocation(path, state) {
  const newLocation = { state: state || null };

  let newURL;
  if (path === undefined) {
    newURL = createURL(location.href);
  } else {
    const key = Math.random()
      .toString(36)
      .substr(2, 5);
    newURL = createURL(path);
    newLocation.key = key;
  }

  newLocation.pathname = newURL.pathname;
  newLocation.search = newURL.search;
  newLocation.hash = newURL.hash;

  return newLocation;
}

export default function createHistory() {
  let listeners = [];
  let location = createLocation();
  let entries = [location];

  function handlePopState({ state }) {
    location = state || entries[0];
    listeners.forEach(listener => listener(location, "POP"));
  }

  function listen(listener) {
    if (typeof listener !== "function") {
      throw new Error("listener must be a function");
    }

    listeners.push(listener);

    if (listeners.length === 1) {
      addEventListener("popstate", handlePopState, false);
    }

    return () => {
      listeners = listeners.filter((l, i) => i !== listeners.indexOf(listener));

      if (!listeners.length) {
        removeEventListener("popstate", handlePopState);
      }
    };
  }

  function push(path, state) {
    location = createLocation(path, state);
    entries.push(location);
    history.pushState(location, null, path);
    listeners.forEach(listener => listener(location, "PUSH"));
  }

  function replace(path, state) {
    location = createLocation(path, state);
    entries.pop();
    entries.push(location);
    history.replaceState(location, null, path);
    listeners.forEach(listener => listener(location, "REPLACE"));
  }

  return {
    go: index => history.go(index),
    back: () => history.back(),
    forward: () => history.forward(),
    get length() {
      return entries.length;
    },
    get location() {
      return location;
    },
    listen,
    push,
    replace
  };
}
