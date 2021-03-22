// const Discord = require("discord.js");
const Command = require("../models/command");
const { embed, embedHelp } = require("../embed");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed (see !embed -help)";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  if (!args.length) {
    message.channel.send(
      embed("you need to give me a message to embed, silly")
        .setColor("YELLOW")
        .setTitle("psst...")
        .setFooter("See: !embed -help, -colors")
    );
    return;
  }

  const error = embed(embedHelp())
    .setColor("YELLOW")
    .setTitle("Embed Help");

  let delim = "\\";
  let color;
  let deleteMsg = false;

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
  if (["-simple", "-s"].includes(arg)) {
    color = "default";
  } else if (colors.includes(arg)) {
    color = arg;
  } else if (["-help", "-h"].includes(arg)) {
    return message.channel.send(error);
  } else if (["-colors", "-c"].includes(arg)) {
    const colorMsg = `Setting a color via shorthand command option will always result in a simple, *non-formatted* message. See **!embed -help** for formatted embeds.\n\n**Usage:**\n!embed <color name> <message>\n!embed <color code> <message>\n\n**Available named colors:**\n${colors.join(", ")}`;
    const colorHelp = embed(colorMsg).setTitle("Embed Color Command Options").setColor("YELLOW");
    return message.channel.send(colorHelp);
  } else if (["-delete", "-d"].includes(arg)) {
    deleteMsg = true;
  }

  let embedString;
  let embedMsg;

  if (color && args.length === 1) {
    return message.channel.send(error);
  }

  if (deleteMsg) {
    embedString = args.slice(1).join(" ");
    embedMsg = embed(embedString, delim);
  } else if (color) {
    embedString = args.slice(1).join(" ");
    embedMsg = embed(embedString, delim, true, color);
  } else if (!color) {
    embedString = args.join(" ");
    embedMsg = embed(embedString, delim);
  }

  if (embedMsg) {
    message.channel.send(embedMsg)
      .then(() => message.delete())
      .catch(() => {
        message.channel.send(error);
      });
  } else {
    message.channel.send(error);
  }
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);