const Command = require("../models/command");
const toggleRole = require("./helpers/toggleRole");

///////////////////////////////////////////////////////////////////

const name = "mod";
const desc = "toggle mod role for a target user";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message) => {

  toggleRole(message, "mod");

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);