class Command {

  constructor(name, desc, func, roles, alias) {
    this.name = name;
    this.desc = desc;
    this.func = func;
    this.roles = roles;
    this.alias = alias;

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