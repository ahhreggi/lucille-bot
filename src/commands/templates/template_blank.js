const Command = require("../../models/command");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "";
const desc = "";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);