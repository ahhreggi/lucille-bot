// const Discord = require("discord.js");
const Command = require("../models/command");
const { embed, embedHelp } = require("../embed");
const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed (see !embed help)";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  if (!args.length) {
    message.channel.send("you need to give me a message to embed, silly");
    return;
  }

  const error = codeBlock(embedHelp());
  let delim = "\\";
  let color;

  // Command usage: !embed <color> <message>
  // If a color is provided, the embed will be simple

  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray"];

  const arg = args[0];
  if (arg.toUpperCase() === "-S") {
    color = "yellow";
  } else if (colors.includes(arg)) {
    color = arg;
  } else if (arg === "help") {
    return message.channel.send(error);
  }

  let embedString;
  let embedMsg;

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