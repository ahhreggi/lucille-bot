const fs = require("fs");
const path = require('path')
const commandsDirectory = path.resolve(__dirname, './commands');

const allCommands = {};

// Dynamically fetch all files with the prefix "command_" from the commands directory and register the command into allCommands
const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.startsWith("command_"));

for (const file of commandFiles) {

  const COMMAND = require(`./commands/${file}`);

  try {

    const name = COMMAND.getName();

    allCommands[name] = {
      desc: COMMAND.getDesc(),
      roles: COMMAND.getRoles(),
      alias: COMMAND.getAlias(),
      cmd: COMMAND.getFunc()
    };

  } catch (err) {

    console.log(`Failed to add command in file: ${file}`);
    console.log(err);

  }

}

module.exports = { allCommands };