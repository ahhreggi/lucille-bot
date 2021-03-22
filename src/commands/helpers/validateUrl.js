const addHttp = require("./addHttp");

/**
 * Returns true if the given URL is possibly valid, false otherwise.
 * @param  {string} url
 *         The URL to validate.
 * @return {string|null}
 *         A possibly valid URL or false if it is invalid.
 */
const validateUrl = (baseUrl) => {
  const url = addHttp(baseUrl);
  let valid;
  // Attempt to construct a URL with the given string
  try {
    new URL(url);
    valid = true;
    // If an error is thrown, the URL is invalid
  } catch (err) {
    valid = false;
  }
  return valid;
};

module.exports = validateUrl;