const fs = require("fs");
const path = require("path");
const commandsDirectory = path.resolve(__dirname, "./commands");

const allCommands = {};

// Dynamically fetch all files with the prefix "command_" from the commands directory and register the command into allCommands
const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.startsWith("command_"));

console.log("Initializing commands...");

for (const file of commandFiles) {

  const COMMAND = require(`./commands/${file}`);

  try {

    const name = COMMAND.getName();
    const desc = COMMAND.getDesc();
    const roles = COMMAND.getRoles();
    const alias = COMMAND.getAlias();
    const cmd = COMMAND.getFunc();

    allCommands[name] = {
      desc,
      roles,
      alias,
      cmd
    };

    console.log(`Added command: ${file}`);

  } catch (err) {

    console.log(`--- Failed to retrieve command: ${file}`);
    console.log(err);

  }

}

console.log("DONE!");

module.exports = allCommands;