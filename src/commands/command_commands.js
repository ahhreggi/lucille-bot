const Command = require("../command");

///////////////////////////////////////////////////////////////////

const name = "commands";
const desc = "list all commands";
const roles = ["user"];
const alias = ["cmds"];

const cmdFunction = (message, args, data) => {

  const { help } = data;

  message.channel.send("**Available commands:**\n" + Object.keys(help)
    .map(c => {
      const desc = help[c].desc;
      const alias = help[c].alias;
      const roles = help[c].roles;
      const result = `\`!${c}${alias.length > 0 ? `|${alias.join("|")}` : ""}\`` +
        ` --- ${desc} (${roles.join(", ")})`;
      return result;
    })
    .join("\n"));

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);