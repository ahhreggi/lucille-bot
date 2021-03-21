const Command = require("../models/command");
const Response = require("../models/response");
const { codeBlock, getSenderVars } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "discordjs";
const desc = "list discordjs info";
const roles = ["user"];
const alias = ["djs"];

const cmdFunction = (message) => {

  const senderVars = getSenderVars(message);
  message.channel.send(codeBlock(`[DISCORDJS INFO FOR ${senderVars.senderTag}]\n\n` + Object.keys(senderVars)
    .map(key => `${key}: ${senderVars[key]}`)
    .join("\n")));

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);