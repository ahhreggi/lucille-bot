// Import the Command class
const Command = require("../command");

// Define function to be executed when the command is called. This MUST accept the "message" parameter (a Discord.Message object).
// args => optional, this is a list of arguments that will be passed into the function IF the user included any.
// For example, the command "!whyme 123 456 789" would give you args = ["123", "456", "789"]
const cmdFunction = (message, args) => {
  message.channel.send("why me :(");
  message.channel.send(`list of args: ${args}`);
};

// Set up the constructor variables
const name = "whyMe";
const description = "this is a description of whyMe";
const permittedRoles = ["user"];
const alias = ["whyMe2"];

// Instantiate and export the new command
module.exports = new Command(name, description, cmdFunction, permittedRoles, alias);

// Import this module into allCommands.js (temporary until allCommands.js fetches all command files automatically)