const Command = require("../command");
const allCommands = require("../allCommands");

///////////////////////////////////////////////////////////////////

const name = "commands";
const desc = "list all commands";
const roles = ["user"];
const alias = ["cmds"];

const cmdFunction = (message) => {

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