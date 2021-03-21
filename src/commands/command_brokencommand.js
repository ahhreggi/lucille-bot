const Command = require("../command");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "brokencommand";
const desc = "";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);