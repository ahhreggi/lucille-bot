// const Discord = require("discord.js");
const Command = require("../models/command");
const { embed, embedHelp } = require("../embed");
const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  let argString = args.join(" ");

  const embedMsg = embed(argString);

  if (embedMsg) {
    message.channel.send(embedMsg)
      .catch(() => {
        message.channel.send(codeBlock(embedHelp()));
      });
  }
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);