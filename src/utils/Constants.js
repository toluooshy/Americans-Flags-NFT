export const DESKTOP_MIN = 600;

var body = document.body,
  html = document.documentElement;

export const TRUE_HEIGHT = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);
