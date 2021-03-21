const Command = require("../models/command");

///////////////////////////////////////////////////////////////////

const name = "say";
const desc = "lucille see, lucille do";
const roles = ["admin", "mod", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  message.channel.send(args.join(" "));

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);