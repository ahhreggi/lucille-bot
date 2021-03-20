const Command = require("../command");

/**
 * The function to execute with the command is called.
 * At this point, you may assume that permissions have been checked.
 * @param {Discord.Message} message
 *        A message received by the client.
 * @param {Array.<string>} args
 *        An array of arguments sent by the user (empty if none).
 *        Example: "!test 123 456 789" => args = ["123", "456", "789"]
 */
const cmdFunction = (message, args) => {

  // MODIFY BELOW ///////////////////////////////////////////////////

  message.channel.send("why me :(");
  message.channel.send(`Arguments passed: ${args}`);
  console.log("Someone ran why me!");

  // END ////////////////////////////////////////////////////////////

};

// name => the command name without the prefix
// description => what the command does
// roles => an array of permitted roles, must be one of "admin", "mod", "vip", "sub", or "user" for all
// alias => an array of alternative command names, can be left empty

// MODIFY BELOW ///////////////////////////////////////////////////

const name = "whyme";
const description = "why meeeeeeee";
const roles = ["user"];
const alias = ["whyme2"];

// END ////////////////////////////////////////////////////////////

module.exports = new Command(name, description, cmdFunction, roles, alias);