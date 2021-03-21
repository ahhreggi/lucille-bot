const Command = require("../models/command");
const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "test2";
const desc = "this is a test2 command";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

  const data = "this is a message with a key";
  const action = "return";
  const key = "secretKey";

  return new Response(data, action, key);

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);