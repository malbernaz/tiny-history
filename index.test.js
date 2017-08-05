import PromisePolyfill from "promise-polyfill";

window.Promise = window.Promise || PromisePolyfill;

import expect, { createSpy } from "expect";

import History from ".";

function lastCallArgs(spy) {
  return spy.calls.slice(-1)[0].arguments;
}

function sleep(time = 20) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}

describe("history", () => {
  beforeEach(() => {
    window.history.replaceState(null, null, "/");
  });

  describe("default behaviour", () => {
    let history;
    beforeEach(() => {
      history = new History();
    });

    describe("listen", () => {
      it("does not immediately call listeners", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(listener.calls.length).toBe(0);

        unlisten();
      });
    });

    describe("the initial location", () => {
      it("does not have a key", () => {
        expect(history.location.key).toNotExist();
      });
    });

    describe("push a new path", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home?the=query#the-hash");
        const [location, action] = listener.calls[0].arguments;
        expect(action).toBe("PUSH");
        expect(location).toMatch({
          pathname: "/home",
          search: "?the=query",
          hash: "#the-hash"
        });

        unlisten();
      });
    });

    describe("push the same path", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home");
        let [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(pathname).toBe("/home");

        history.push("/home");
        [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(pathname).toBe("/home");

        history.back();

        return sleep().then(() => {
          [{ pathname }, action] = lastCallArgs(listener);
          expect(action).toBe("POP");
          expect(pathname).toBe("/home");

          unlisten();
        });
      });
    });

    describe("push state", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home?the=query#the-hash", { the: "state" });
        const [location, action] = listener.calls[0].arguments;
        expect(action).toBe("PUSH");
        expect(location).toMatch({
          pathname: "/home",
          search: "?the=query",
          hash: "#the-hash",
          state: { the: "state" }
        });

        unlisten();
      });
    });

    describe("push with no pathname", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home?the=query#the-hash");
        let [location, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(location).toMatch({
          pathname: "/home",
          search: "?the=query",
          hash: "#the-hash"
        });

        history.push("?another=query#another-hash");
        [location, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(location).toMatch({
          pathname: "/home",
          search: "?another=query",
          hash: "#another-hash"
        });

        unlisten();
      });
    });

    describe("replace a new path", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.replace("/home?the=query#the-hash");
        const [location, action] = listener.calls[0].arguments;
        expect(action).toBe("REPLACE");
        expect(location).toMatch({
          pathname: "/home",
          search: "?the=query",
          hash: "#the-hash"
        });

        unlisten();
      });
    });

    describe("replace the same path", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.replace("/home");
        let [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("REPLACE");
        expect(pathname).toBe("/home");

        history.replace("/home");
        [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("REPLACE");
        expect(pathname).toBe("/home");

        unlisten();
      });
    });

    describe("replace state", () => {
      it("calls change listeners with the new location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.replace("/home?the=query#the-hash", { the: "state" });
        const [location, action] = listener.calls[0].arguments;
        expect(action).toBe("REPLACE");
        expect(location).toMatch({
          pathname: "/home",
          search: "?the=query",
          hash: "#the-hash",
          state: { the: "state" }
        });

        unlisten();
      });
    });

    describe("go back", () => {
      it("calls change listeners with the previous location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home");
        let [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(pathname).toBe("/home");

        history.back();
        return sleep().then(() => {
          [{ pathname }, action] = lastCallArgs(listener);
          expect(action).toBe("POP");
          expect(pathname).toBe("/");

          unlisten();
        });
      });
    });

    describe("go forward", () => {
      it("calls change listeners with the next location", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home");
        let [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(pathname).toBe("/home");

        history.back();
        return sleep()
          .then(() => {
            [{ pathname }, action] = lastCallArgs(listener);
            expect(action).toBe("POP");
            expect(pathname).toBe("/");

            history.forward();

            return sleep();
          })
          .then(() => {
            [{ pathname }, action] = lastCallArgs(listener);
            expect(action).toBe("POP");
            expect(pathname).toBe("/home");

            unlisten();
          });
      });
    });

    describe("go to index", () => {
      it("calls change listeners with the given an index of an entry", () => {
        const listener = createSpy();
        const unlisten = history.listen(listener);

        expect(history.location.pathname).toBe("/");

        history.push("/home");
        let [{ pathname }, action] = lastCallArgs(listener);
        expect(action).toBe("PUSH");
        expect(pathname).toBe("/home");

        history.go(-1);
        return sleep()
          .then(() => {
            [{ pathname }, action] = lastCallArgs(listener);
            expect(action).toBe("POP");
            expect(pathname).toBe("/");

            history.go(1);

            return sleep();
          })
          .then(() => {
            [{ pathname }, action] = lastCallArgs(listener);
            expect(action).toBe("POP");
            expect(pathname).toBe("/home");

            unlisten();
          });
      });
    });
  });
});
