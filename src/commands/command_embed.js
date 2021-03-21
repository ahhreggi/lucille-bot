const Discord = require("discord.js");
const Command = require("../models/command");
// const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  const outerDelim = "$";
  const innerDelim = ":";
  const space = { name: "\u200B", value: "\u200B" };

  let argString = args.join(" ");

  // Case 0: no arguments are given => send error
  if (!argString) {
    return message.channel.send("embed cannot be empty");
  }

  let embed = new Discord.MessageEmbed();

  // Case 1: a plain message is given => embed the entire argString as a description and send
  if (!argString.startsWith(outerDelim)) {
    embed.setDescription(argString);
    return message.channel.send(embed);
  }

  // Case 2: options are provided => must start with $

  let valid = 0;

  // Parse args to isolate options
  let argOpts = args.join(" ").split(outerDelim).slice(1); // .slice(1) to remove '' at index 0

  // Validate option syntax (when split on the inner delim, will have a length of > 1)
  // Invalid syntax => send an error
  for (const opt of argOpts) {

    const opts = opt.trim().replace(innerDelim, "%~%").split("%~%"); // in case innerDelim (:) is elsewhere in the value

    // If the option is a single string and not a space, syntax is invalid
    if (opts.length === 1 && opts[0] !== "space") {
      message.channel.send(`invalid option syntax: ${opts[0]}`);
      return;

      // If the option is a single string and is a space, add a spacer
    } else if (opts.length === 1 && opts[0] === "space") {
      embed = embed.addField(space);

      // If the option is a property-value pair...
    } else if (opts.length === 2) {

      // Isolate the property and value
      const property = opts[0].trim();
      const value = opts[1].trim();

      // VALID PROPERTIES:

      // "color: ff0000" => set the embed color
      if (property.toLowerCase() === "color" && value) {
        const color = value.startsWith("#") ? value : `#${value}`; // --> TODO: check if # is necessary
        embed = embed.setColor(color);

        // "title: This is the title" => set the title
      } else if (property.toLowerCase() === "title" && value) {
        const title = value;
        embed = embed.setTitle(title);
        valid++;

        // "desc: This is the description" => set the description
      } else if (property.toLowerCase() === "desc" && value) {
        const desc = value;
        embed = embed.setDescription(desc);
        valid++;

        // If the property is none of the above, use the opts as the name and value of a field instead
        // "The field title: The field description" => add a field
      } else if (property && value) {
        embed = embed.addField(property, value);
        valid++;
      }

      // Shouldn't ever reach this but just incase
    } else {
      return message.channel.send("unhandled case: opts was somehow split into 3");
    }

  }

  // The embed is sent only if at least one valid text option was set
  if (valid) {
    try {
      message.channel.send(embed);
      // message.delete();
    } catch (err) {
      return message.channel.send("hey are you trying to kill me?! <:ahhknife2:823269952240091177>");
    }
  } else {
    message.channel.send("embed cannot be empty");
  }

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);