const Command = require("../models/command");
const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "";
const desc = "";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

  // Do something.

  const content = "";
  const action = "send" || "return";
  const key = null || "secretKey";

  return new Response(content, action, key);

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);