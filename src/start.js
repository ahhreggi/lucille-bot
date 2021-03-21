const fs = require("fs");
const path = require("path");
const commandsDirectory = path.resolve(__dirname, "./commands");

const help = {};

// Dynamically fetch all files with the prefix "command_" from the commands directory and create a help directory
const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.startsWith("command_"));

for (const file of commandFiles) {

  const COMMAND = require(`./commands/${file}`);

  try {

    const name = COMMAND.getName();

    help[name] = {
      desc: COMMAND.getDesc(),
      roles: COMMAND.getRoles(),
      alias: COMMAND.getAlias()
    };

  } catch (err) {

    console.log(`Failed to retrieve command: ${file}`);
    console.log(err);

  }

}

module.exports = help;