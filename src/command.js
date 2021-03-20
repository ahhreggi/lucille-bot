const { codeBlock } = require("./commandUtils");

class Command {
  constructor(name, description, func, permittedRoles = ["user"], alias = []) {
    this.name = name;
    this.desc = description;
    this.func = func;
    this.roles = permittedRoles;
    this.alias = alias;
  }

  getName() {
    return this.name;
  }

  getDesc() {
    return this.desc;
  }

  getFunc() {
    return this.func;
  }

  getRoles() {
    return this.roles;
  }

  getAlias() {
    return this.alias;
  }

}

module.exports = Command;