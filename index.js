function createURL(path) {
  try {
    const url = path ? new URL(path, location) : new URL(location);
    if (!url.pathname) throw new Error();
    return url;
  } catch (error) {
    const link = document.createElement("a");
    link.href = path || location.href;
    const pathname = (!!path && !link.pathname ? location.pathname : link.pathname)
      .split("/")
      .filter(Boolean)
      .join("/");

    return {
      pathname: `/${pathname}`,
      search: link.search,
      hash: link.hash
    };
  }
}

export default class BrowserHistory {
  constructor() {
    this.listeners = [];
    this.location = this.createLocation();
    this.entries = [this.location];

    this.go = index => history.go(index);
    this.back = () => history.back();
    this.forward = () => history.forward();

    this.handlePopState = ({ state }) => {
      this.location = state || this.entries[0];
      this.listeners.forEach(listener => listener(this.location, "POP"));
    };

    this.firstLocation = true;
  }

  get length() {
    return this.entries.length;
  }

  listen(listener) {
    if (typeof listener !== "function") {
      throw new Error("listener must be a function");
    }

    this.listeners.push(listener);

    if (this.listeners.length === 1) {
      addEventListener("popstate", this.handlePopState, false);
    }

    return () => {
      this.listeners = this.listeners.filter((l, i) => i !== this.listeners.indexOf(listener));

      if (!this.listeners.length) {
        removeEventListener("popstate", this.handlePopState);
      }
    };
  }

  createLocation(path, state) {
    const newLocation = { state: state || null };

    let newURL;
    if (path === undefined) {
      newURL = createURL();
    } else {
      const key = Math.random().toString(36).substr(2, 5);
      newURL = createURL(path);
      newLocation.key = key;
    }

    newLocation.pathname = newURL.pathname;
    newLocation.search = newURL.search;
    newLocation.hash = newURL.hash;

    return newLocation;
  }

  push(path, state) {
    this.location = this.createLocation(path, state);
    this.entries.push(this.location);
    history.pushState(this.location, null, path);
    this.listeners.forEach(listener => listener(this.location, "PUSH"));
  }

  replace(path, state) {
    this.location = this.createLocation(path, state);
    this.entries.pop();
    this.entries.push(this.location);
    history.replaceState(this.location, null, path);
    this.listeners.forEach(listener => listener(this.location, "REPLACE"));
  }
}
