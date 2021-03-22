// const Discord = require("discord.js");
const Command = require("../models/command");
const { embed, embedHelp } = require("../embed");
const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed (see !embed -help)";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  if (!args.length) {
    message.channel.send(codeBlock("you need to give me a message to embed, silly\n\nSee: !embed -help, -colors"));
    return;
  }

  const error = codeBlock(embedHelp());
  let delim = "\\";
  let color;

  // Command usage: !embed <color> <message>
  // If a color is provided, the embed will be simple

  const colors = [
    "default",
    "aqua",
    "dark_aqua",
    "green",
    "dark_green",
    "blue",
    "dark_blue",
    "purple",
    "dark_purple",
    "luminous_vivid_pink",
    "dark_vivid_pink",
    "gold",
    "dark_gold",
    "orange",
    "dark_orange",
    "red",
    "dark_red",
    "grey",
    "dark_grey",
    "darker_grey",
    "light_grey",
    "navy",
    "dark_navy",
    "yellow",
    "white",
    "blurple",
    "greyple",
    "dark_but_not_black",
    "not_quite_black"
  ];

  const arg = args[0].toLowerCase();
  if (arg === "-S") {
    color = "default";
  } else if (colors.includes(arg)) {
    color = arg;
  } else if (["-help", "-h"].includes(arg)) {
    return message.channel.send(error);
  } else if (["-colors", "-c"].includes(arg)) {
    return message.channel.send(codeBlock(`Setting a shorthand color option will always result in a simple (non-formatted) message.\nSee !embed -help for formatted embeds.\n\nUsage: !embed <color> <message> OR !embed <color code> <message>\n\nAvailable colors: ${colors.join(", ")}`));
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