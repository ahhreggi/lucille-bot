const { codeBlock } = require("./commandUtils");

class Command {
  constructor(name, description, func, permittedRoles = ["user"], alias = []) {
    this.name = name;
    this.desc = description;
    this.cmd = func;
    this.roles = permittedRoles;
    this.alias = alias;
  }

  use(message) {
    this.cmd(message);
  }

  help(message) {
    message.channel.send(codeBlock("help 123"));
  }

}

module.exports = Command;