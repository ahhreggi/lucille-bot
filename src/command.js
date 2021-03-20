const { codeBlock } = require("./commandUtils");

class Command {
  constructor(name, description, func, permittedRoles = ["user"], alias = []) {
    this.name = name;
    this.desc = description;
    this.func = func;
    this.roles = permittedRoles;
    this.alias = alias;
  }

  use(message) {
    this.func(message);
  }

  help(message) {
    message.channel.send(codeBlock("help 123"));
  }

}

module.exports = Command;