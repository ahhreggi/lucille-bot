const request = require("request-promise-native");

/**
 * Fetch a random dad joke from the https://icanhazdadjoke.com/ API.
 * @return {object}
 *         Request object.
 */
const fetchDadJoke = function() {
  const options = {
    uri: "https://icanhazdadjoke.com/",
    headers: {
      "User-Agent": "private discord bot"
    },
    json: true
  };
  return request(options);
};

module.exports = fetchDadJoke;