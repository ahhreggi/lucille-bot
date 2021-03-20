const Command = require("../command");

const fs = require("fs");
const path = require("path");
const commandsDirectory = path.resolve(__dirname, "../commands");

///////////////////////////////////////////////////////////////////

const name = "commands";
const desc = "list all commands";
const roles = ["user"];
const alias = ["cmds"];

const cmdFunction = (message) => {

  const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.startsWith("command_"));

  const allCommands = {};

  for (const file of commandFiles) {

    const COMMAND = require(`./commands/${file}`);

    try {

      const name = COMMAND.getName();

      allCommands[name] = {
        desc: COMMAND.getDesc(),
        roles: COMMAND.getRoles(),
        alias: COMMAND.getAlias()
      };

    } catch (err) {

      console.log(`Failed to retrieve command: ${file}`);
      console.log(err);

    }

  }

  message.channel.send("**Available commands:**\n" + Object.keys(allCommands)
    .map(c => {
      const desc = allCommands[c].desc;
      const alias = allCommands[c].alias;
      const roles = allCommands[c].roles;
      const result = `\`!${c}${alias.length > 0 ? `|${alias.join("|")}` : ""}\`` +
        ` --- ${desc} (${roles.join(", ")})`;
      return result;
    })
    .join("\n"));

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);