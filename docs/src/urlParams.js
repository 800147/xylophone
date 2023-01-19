export const urlParams = (parsers = {}) => Object.fromEntries(
  Array.from(
    new URLSearchParams(window.location.search).entries()
  ).map(
    ([key, value]) => ([key, parsers[key] ? parsers[key](value) : value])
  )
);
