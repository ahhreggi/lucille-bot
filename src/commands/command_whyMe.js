const Command = require("../models/command");

///////////////////////////////////////////////////////////////////

const name = "whyme";
const desc = "why meeeeeeee";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message) => {

  message.channel.send("why me :(");

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);