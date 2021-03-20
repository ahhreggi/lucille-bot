// Dynamically fetch all files with the prefix "command_" from the commands directory and register the command into allCommands

const fs = require("fs");
const path = require('path').resolve(__dirname, './commands');

const allCommands = {};

const commandFiles = fs.readdirSync(path).filter(file => file.startsWith("command_"));

for (const file of commandFiles) {
  console.log(file);
  // const COMMAND = require(`./commands/${file}`);

  // const name = COMMAND.getName();

  // allCommands[name] = {
  //   desc: COMMAND.getDesc(),
  //   roles: COMMAND.getRoles(),
  //   alias: COMMAND.getAlias(),
  //   cmd: COMMAND.getFunc()
  // };

}

module.exports = { allCommands };
