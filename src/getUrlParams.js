// https://github.com/800147/tools/blob/main/src/getUrlParams/getUrlParams.js

export const getUrlParams = (parsers) =>
  Object.fromEntries(
    Array.from(new URLSearchParams(window.location.search).entries()).map(([key, value]) => [
      key,
      parsers?.[key] ? parsers[key](value) : value,
    ]),
  );
