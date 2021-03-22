// Used for: command_embed.js

/**
 * Returns a URL with an added scheme if it doesn't already have one.
 * @param  {string} url
 *         The URL which may or may not include http:// or https://.
 * @return {string}
 *         The resulting URL after adding a scheme (if needed).
 */
const addHttp = (url) => {
  let result = url;
  if (!result.startsWith("http://") && !result.startsWith("https://")) {
    result = "http://" + result;
  }
  return result;
};

module.exports = addHttp;