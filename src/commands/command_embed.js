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
  const innerDelim = "--";
  const space = { name: space, value: space };

  // const options = {
  //   color: "#fce303",
  //   title: null,
  //   desc: null
  // }

  let embed = new Discord.MessageEmbed();

  try {
    // Parse args to isolate options
    let argOpts = args.join(" ").split(outerDelim).slice(1);
    // For each option
    for (const opt of argOpts) {
      // Parse option to isolate property and value
      const options = opt.split(innerDelim);
      const property = options[0];

      // "space" => add a spacer
      if (options[0] === "space") {
        embed = embed.addField(space, space);

      } else if (options.length > 1) {

        const value = options[1];

        // "color--ff0000" => set the embed color
        if (property === "color") {
          const color = value.startsWith("#") ? value : `#${value}`;
          embed = embed.setColor(color);

          // "title--This is the title" => set the title
        } else if (property === "title") {
          const title = value;
          embed = embed.setTitle(title);

          // "desc--This is the description" => set the description
        } else if (property === "desc") {
          const desc = value;
          embed = embed.setDescription(desc);
        }
      }
    }

    message.channel.send(embed);
    // message.delete();

  } catch (err) {
    return message.channel.send("hey are you trying to kill me?! <:ahhknife2:823269952240091177>");

  }
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);