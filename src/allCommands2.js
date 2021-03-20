// TODO: Automatically import all files with the prefix "command_" within the "commands" folder and add it to the allCommands object.

const allCommands = {};

// For now, import each command manually and add it to allCommands
const whyMe = require("./commands/command_whyMe");

// KEY = the command name, VALUE = an object with each property, retrieved via command methods
const name = whyMe.getName();
allCommands[name] = {
  desc: whyMe.getDesc(),
  permittedRoles: whyMe.getRoles(),
  alias: whyMe.getAlias(),
  cmd: whyMe.getFunc()
};

module.exports = { allCommands };
