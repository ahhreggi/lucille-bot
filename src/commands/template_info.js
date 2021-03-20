const Command = require("../command");
// const errors = require("./errors");
// const {
//   codeBlock,
//   getMentionedUser,
//   getSenderVars,
//   hasRole,
//   toggleRole,
//   fetchDadJoke
// } = require("../utility");

/**
 * Command constructor variables
 *   - name: the command name without the prefix
 *   - desc: what the command does
 *   - roles: an array of permitted roles, must be one of "admin", "mod", "vip", "sub", or "user" for all
 *   - alias: an array of alternative command names, can be left empty
 */

// MODIFY BELOW ///////////////////////////////////////////////////

const name = "test";
const desc = "a command for testing purposes";
const roles = ["user"];
const alias = ["test1", "test2", "test3"];

// END ////////////////////////////////////////////////////////////

/**
 * The function to execute with the command is called.
 * Assume it will only be executed if the user has one of the permitted roles.
 * Roles are checked on the server-side only. You can add additional server-side
 * checks using hasRole() but role configurations on Discord will still apply.
 * @param {Discord.Message} message
 *        A message received by the client.
 * @param {Array.<string>} args
 *        An array of arguments sent by the user (empty if none).
 *        Example: "!test 123 456 789" => args = ["123", "456", "789"]
 */
const cmdFunction = (message, args) => {

  // MODIFY BELOW ///////////////////////////////////////////////////

  message.channel.send("This is a message.");
  message.channel.send(`Arguments passed: ${args}`);
  console.log("Someone ran a test command!");

  // END ////////////////////////////////////////////////////////////

};

module.exports = new Command(name, desc, cmdFunction, roles, alias);