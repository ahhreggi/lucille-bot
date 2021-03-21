const Command = require("../models/command");
const Response = require("../models/response");
const toggleRole = require("./helpers/toggleRole");

///////////////////////////////////////////////////////////////////

const name = "bot";
const desc = "toggle bot role for a target user";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message) => {

  toggleRole(message, "bot");

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);