// Used for: command_dadJoke.js

const request = require("request-promise-native");

/**
 * Fetch a random dad joke from the https://icanhazdadjoke.com/ API.
 * @return {object}
 *         Request object.
 */
const fetchDadJoke = () => {
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