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

  if (!args.length) return;

  const error = codeBlock(embedHelp());
  let delim = "\\";
  let color;

  // Command usage: !embed -S -R -B -Y -G -W -K embedString
  // If an option is provided, the embed will be simple.

  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray"];

  const arg = args[0];
  if (arg === "-S") {
    color = "gray";
  } else if (colors.includes(arg)) {
    color = arg;
    console.log("color selected:", color);
    console.log("args:", args);
  }

  let embedString;
  let embedMsg;
  // If a delim is provided, embedString starts at index 1 and must start with delim

  if (color && args.length === 1) {
    return message.channel.send(error);
  }

  if (color) {
    embedString = args.slice(1).join(" ");
    embedMsg = embed(embedString, delim, true, color);
  } else if (!color) {
    embedString = args.join(" ");
    embedMsg = embed(embedString, delim);
  }

  if (embedMsg) {
    message.channel.send(embedMsg)
      .catch(() => {
        message.channel.send(error);
      });
  } else {
    message.channel.send(error);
  }
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);