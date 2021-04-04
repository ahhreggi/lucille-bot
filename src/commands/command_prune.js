const Command = require("../models/command");
// const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

// ===============================================================================
// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
// BIG DISCLAIMER: be very careful with that command, it hasn't been tested a lot.
//                 It had been added for dev purposes.
// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
//
// TODO: more tests and especially make sure that it is ADMIN ONLY
// ===============================================================================

const name = "prune";
const desc = "delete messages";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message, args) => {

  const nbMessagesToDelete = parseInt(args[0]) + 1;

  if (isNaN(nbMessagesToDelete)) {
    return message.reply("not a valid number bro");
  } else if (nbMessagesToDelete <= 1 || nbMessagesToDelete > 100) {
    return message.reply("number must be between 1 and 99");
  }

  message.channel.bulkDelete(nbMessagesToDelete, true).catch(err => {
    console.error(err);
    message.channel.send("there was an error trying to prune messages in this channel!");
  });

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);