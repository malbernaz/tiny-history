import createLocation from "./createLocation";

export default class TinyHistory {
  constructor() {
    this.listeners = [];
    this.location = createLocation();
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

  push(path, state) {
    this.location = createLocation(path, state);
    this.entries.push(this.location);
    history.pushState(this.location, null, path);
    this.listeners.forEach(listener => listener(this.location, "PUSH"));
  }

  replace(path, state) {
    this.location = createLocation(path, state);
    this.entries.pop();
    this.entries.push(this.location);
    history.replaceState(this.location, null, path);
    this.listeners.forEach(listener => listener(this.location, "REPLACE"));
  }
}
