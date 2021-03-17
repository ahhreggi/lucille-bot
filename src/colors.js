const colorCodes = {
  default: "\033[0m",   // regular
  black: "\033[0;30m",
  red: "\033[0;31m",
  green: "\033[0;32m",
  yellow: "\033[0;33m",
  blue: "\033[0;34m",
  purple: "\033[0;35m",
  cyan: "\033[0;36m",
  white: "\033[0;37m",
  bblack: "\033[1;30m", // bold
  bred: "\033[1;31m",
  bgreen: "\033[1;32m",
  byellow: "\033[1;33m",
  bblue: "\033[1;34m",
  bpurple: "\033[1;35m",
  bcyan: "\033[1;36m",
  bwhite: "\033[1;37m"
};

// Wrap a string with an ANSI escape sequence for a color
const color = (string, colorName = "default", resetColor = "default") => {
  return colorCodes[colorName] + string + colorCodes[resetColor];
};

module.exports = color;