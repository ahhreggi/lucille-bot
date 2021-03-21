const Command = require("../models/command");
const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "test";
const desc = "this is a test command";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

  const data = "this is a test message"
  const action = "send";

  return new Response(data, action);

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);