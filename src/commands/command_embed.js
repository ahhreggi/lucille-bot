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


  let delim = "\\";
  let forceSimple = false;
  let color = "";

  let argStrIndex = 0;

  // Command usage: !embed -S -R -B -Y -G -W -K embedString
  // If an option is provided, the embed will be simple.
  // If a delim is provided, the embed can be either simple or formatted.

  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray"];

  const arg = args[0];
  if (arg === "-S") {
    forceSimple = true;
    argStrIndex = 1;
  } else if (colors.includes(arg)) {
    color = arg;
    console.log("color selected:", color);
  } else if (arg === "-!") {
    delim = "!";
  } else if (arg === "-%") {
    delim = "%";
  } else if (arg === "-&") {
    delim = "&";
  } else if (arg === "-$") {
    delim = "$";
  }

  let embedString;
  // If a delim is provided, embedString starts at index 1 and must start with delim

  if ((delim !== "\\" || color) && args.length === 1) {
    return message.channel.send(error);
  }

  if (delim !== "\\") {
    argStrIndex = 1;
    if (args[1] && !args[1].startsWith(delim)) {
      return message.channel.send(codeBlock("Message must be formatted if using an optional property identifier."));
    }

  } else if (color) {
    embedString = args.slice(1).join(" ");
    return embed(embedString, delim, true, color);
  }

  embedString = args.slice(argStrIndex).join(" ");

  const embedMsg = embed(embedString, delim, forceSimple);
  const error = codeBlock(embedHelp());

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