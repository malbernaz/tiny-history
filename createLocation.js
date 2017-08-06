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

export default function createLocation(path, state) {
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
