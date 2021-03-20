const Command = require("../command");
const errors = require("./errors");
const {
  codeBlock,
  getMentionedUser,
  getSenderVars,
  hasRole,
  toggleRole,
  fetchDadJoke
} = require("../helpers");

const cmdFunction = (message, args) => {

  // MODIFY BELOW ///////////////////////////////////////////////////



  // END ////////////////////////////////////////////////////////////

};

// MODIFY BELOW ///////////////////////////////////////////////////

const name = "";
const desc = "";
const roles = ["user"];
const alias = [];

// END ////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, cmdFunction, roles, alias);