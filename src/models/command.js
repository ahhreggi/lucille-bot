class Command {

  constructor(name, desc, roles, alias, func) {
    this.name = name;
    this.desc = desc;
    this.roles = roles;
    this.alias = alias;
    this.func = func;

    if (!roles.length) {
      this.roles = ["user"];
    }

  }

  getName() {
    return this.name;
  }

  getDesc() {
    return this.desc;
  }

  getRoles() {
    return this.roles;
  }

  getAlias() {
    return this.alias;
  }

  getFunc() {
    return this.func;
  }

}

module.exports = Command;