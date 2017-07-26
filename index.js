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
      this.listeners = this.listeners.filter(
        (l, i) => i !== this.listeners.indexOf(listener)
      );

      if (!this.listeners.length) {
        removeEventListener("popstate", this.handlePopState);
      }
    };
  }

  createLocation(path = location, state) {
    const newLocation = { state: state || null };

    let newURL;
    if (path instanceof Location) {
      newURL = new URL(path);
    } else {
      const key = Math.random().toString(36).substr(2, 5);
      newURL = new URL(path, location);
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
