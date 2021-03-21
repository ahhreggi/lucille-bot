const Command = require("../models/command");
const Response = require("../models/response");

///////////////////////////////////////////////////////////////////

const name = "whyme";
const desc = "why meeeeeeee";
const roles = ["admin", "vip"];
const alias = ["whyme1", "whyme2", "whyme3"];

const cmdFunction = (message) => {

  message.channel.send("why me :(");

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);