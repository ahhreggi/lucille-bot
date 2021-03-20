const Command = require("../command");
const toggleRole = require("./helpers/toggleRole");

///////////////////////////////////////////////////////////////////

const name = "bot";
const desc = "toggle bot role for a target user";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message) => {

  toggleRole(message, "bot")

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, cmdFunction, roles, alias);