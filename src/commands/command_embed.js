const Discord = require("discord.js");
const Command = require("../models/command");
const { codeBlock } = require("../utility");
const addHttp = require("./helpers/addHttp");
// TODO: helper functions to check if URL starts with http://, change global embedprefix, !embed help triggers embedHelp();

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  const outerDelim = "\\";
  const innerDelim = ":";
  const space = "\u200B";

  let argString = args.join(" ");

  // Case 0: no arguments are given => send error
  if (!argString) {
    return message.channel.send("embed cannot be empty");
  }

  let embed = new Discord.MessageEmbed();

  // Mode 1: a plain message is given => embed the entire argString as a description and send
  if (!argString.startsWith(outerDelim)) {
    embed.setDescription(argString);
    return message.channel.send(embed);
  }

  // Mode 2: message starts with outerDelim => construct embed using options

  // Parse args to isolate options
  let argOpts = args.join(" ").split(outerDelim).slice(1); // .slice(1) to remove '' at index 0

  let valid = 0;
  let footer = "";
  let footerimg;

  // Parse options to isolate property and value
  for (const opt of argOpts) {

    const opts = opt.replace(innerDelim, "%~/$!%").split("%~/$!%");

    // If the option is a single string, syntax is invalid
    if (opts.length === 1) {
      let usage = `Invalid syntax: ${outerDelim}${opts[0]}`;
      usage += "\n\nEither use a simple message (!embed This is a message.) or construct using the following options:";
      usage += `\n\n${outerDelim}color: red`;
      usage += `\n${outerDelim}title: Sample Embed`;
      usage += `\n${outerDelim}url: google.ca`;
      usage += `\n${outerDelim}author: Lucille`;
      usage += `\n${outerDelim}desc: This is the description.`;
      usage += `\n${outerDelim}thumbnail: i.imgur.com/pbrZNDp.jpg`;
      usage += `\n${outerDelim}img: i.imgur.com/pbrZNDp.jpg`;
      usage += `\n${outerDelim}footer: This is the footer.`;
      usage += `\n${outerDelim}footerimg: i.imgur.com/pbrZNDp.jpg`;
      usage += `\n${outerDelim}add: space`;
      usage += `\n${outerDelim}add: timestamp`;
      usage += `\n${outerDelim}Some Field Title: Some text.`;
      usage += `\n\nExample: !embed ${outerDelim}color: red ${outerDelim}title: Google ${outerDelim}url: google.ca ${outerDelim}desc: Google is your friend.`;

      const exampleEmbed = new Discord.MessageEmbed().setColor("RED").setTitle("Google").setURL("http://google.ca").setDescription("Google is your friend.");
      message.channel.send(codeBlock(usage));
      message.channel.send(exampleEmbed);
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
        embed = embed.setURL(addHttp(value));

        // author
      } else if (property.toLowerCase() === "author" && value) {
        embed = embed.setAuthor(value);
        valid++;

        // thumbnail
      } else if (property.toLowerCase() === "thumbnail" && value) {
        embed = embed.setThumbnail(addHttp(value));
        valid++;

        // footer
      } else if (property.toLowerCase() === "footer" && value) {
        footer = value;

        // footer image
      } else if (property.toLowerCase() === "footerimg" && value) {
        footerimg = addHttp(value);

        // image
      } else if (["image", "img"].includes(property.toLowerCase()) && value) {
        embed = embed.setImage(addHttp(value));
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
    } else if (!footer && footerimg) {
      return message.channel.send(codeBlock(`Setting a footerimg requires a footer: \n\n!embed ${outerDelim}footer: This is the footer text ${outerDelim}footerimg: i.imgur.com/pbrZNDp.jpg`));
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