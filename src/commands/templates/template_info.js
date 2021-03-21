const Command = require("../models/command");
const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");
// If the function uses any helper functions, add them to the helpers folder

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
 *
 * Assume it will only be executed if the user has one of the permitted roles.
 * Roles are checked on the server-side only. You can add additional server-side
 * checks using hasRole() but role configurations on Discord will still apply.
 *
 * You can send messages directly as normal, but if the function needs to
 * alter a global variable, return a Response object to send the data to bot.js.
 *
 *   content = a string of data to return
 *   key = the value used to determine what bot.js should do
 *
 * @param  {Discord.Message} message
 *         A message received by the client.
 * @param  {Array.<string>} args
 *         An array of arguments sent by the user (empty if none).
 *         Example: "!test 123 456 789" => args = ["123", "456", "789"]
 * @return {Response|undefined}
 *         A Response object or undefined if a command is not successfully executed.
 */
const cmdFunction = (message, args) => {

  // MODIFY BELOW ///////////////////////////////////////////////////

  message.channel.send("This is a message.");
  message.channel.send(`Arguments passed: ${args}`);
  console.log("Someone ran a test command!");

  // Only necessary if the function must alter a global variable
  const content = "Data to return to bot.js";
  const key = "secretKey"; // The value used to do something in bot.js
  return new Response(content, key);

  // END ////////////////////////////////////////////////////////////

};

module.exports = new Command(name, desc, roles, alias, cmdFunction);