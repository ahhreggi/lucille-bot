const Discord = require("discord.js");
const Command = require("../models/command");
// const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  let outerDelim = "--";
  const innerDelim = ":";
  const space = "\u200B";

  let argString = args.join(" ");

  const validDelims = ["$", "%", "#"];

  // Set custom delim
  if (argString.length > 2 && argString.startsWith("--")) {
    const newDelim = argString[2];
    if (!validDelims.includes(newDelim)) {
      return message.channel.send(`property identifier must be one of ${validDelims.join(", ")}`);
    } else {
      outerDelim = newDelim;
      argString = argString.replace(`--${outerDelim}`, "");
      message.channel.send("set delim to", outerDelim);
    }
  }

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
  let footer = "";
  let footerimg;

  // Parse args to isolate options
  let argOpts = args.join(" ").split(outerDelim).slice(1); // .slice(1) to remove '' at index 0

  // Validate option syntax (when split on the inner delim, will have a length of > 1)
  // Invalid syntax => send an error
  for (const opt of argOpts) {

    const opts = opt.replace(innerDelim, "%~$!%").split("%~$!%"); // in case innerDelim (:) is elsewhere in the value

    // If the option is a single string, syntax is invalid
    if (opts.length === 1) {
      message.channel.send(`invalid option syntax: ${opts[0]}`);
      return;

      // If the option is a property-value pair...
    } else if (opts.length === 2) {

      // Isolate the property and value
      const property = opts[0].trim();
      const value = opts[1].trim();

      // VALID PROPERTIES:

      // spacer
      if (property.toLowerCase() === "add" && value.toLowerCase() === "space") {
        embed = embed.addField(space, space);

        // timestamp
      } else if (property.toLowerCase() === "add" && value.toLowerCase() === "timestamp") {
        embed = embed.setTimestamp();

        // color
      } else if (property.toLowerCase() === "color" && value) { // TODO: make presets?
        embed = embed.setColor(value.toUpperCase());

        // title
      } else if (property.toLowerCase() === "title" && value) {
        embed = embed.setTitle(value);
        valid++;

        // desc
      } else if (property.toLowerCase() === "desc" && value) {
        embed = embed.setDescription(value);
        valid++;

        // url (requires title)
      } else if (property.toLowerCase() === "url" && value) {
        embed = embed.setURL(`http://${value}`);

        // author
      } else if (property.toLowerCase() === "author" && value) {
        embed = embed.setAuthor(value);
        valid++;

        // thumbnail
      } else if (property.toLowerCase() === "thumbnail" && value) {
        embed = embed.setThumbnail(`http://${value}`);
        valid++;

        // footer
      } else if (property.toLowerCase() === "footer" && value) {
        footer = value;

        // footer image
      } else if (property.toLowerCase() === "footerimg" && value) {
        footerimg = `http://${value}`;

        // image
      } else if (["image", "img"].includes(property.toLowerCase()) && value) {
        embed = embed.setImage(`http://${value}`);
        valid++;

        // If the property is none of the above, use the opts as the name and value of a field instead
        // "The field title: The field description"
      } else if (property && value) {
        embed = embed.addField(property, value);
        valid++;
      }

      // Shouldn't ever reach this but just incase
    } else {
      return message.channel.send("unhandled case: opts was somehow split into 3");
    }

    // Footer requires footer text, img is optional
    if (footer && !footerimg) {
      embed = embed.setFooter(footer);
      valid++;
    } else if (footer && footerimg) {
      embed = embed.setFooter(footer, footerimg);
      valid++;
    }

  }

  // The embed is sent only if at least one valid option was set
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