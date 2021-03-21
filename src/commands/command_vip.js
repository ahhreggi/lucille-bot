const Command = require("../models/command");
const toggleRole = require("./helpers/toggleRole");

///////////////////////////////////////////////////////////////////

const name = "vip";
const desc = "toggle vip role for a target user";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message) => {

  toggleRole(message, "vip");

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);