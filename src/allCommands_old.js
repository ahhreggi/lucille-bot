// TODO: Move these into individual command_NAME.js files within the commands directory

const allCommands = {
  commands: {
    desc: "list all commands",
    permittedRoles: ["user"],
    alias: ["cmds"],
    cmd: (message) => {
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
    }
  }
};

module.exports = allCommands;