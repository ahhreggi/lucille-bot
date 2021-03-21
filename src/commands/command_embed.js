const Discord = require("discord.js");
const Command = require("../models/command");
// const Response = require("../models/response");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message, args) => {

  const sectionDelim = "|";
  const fieldDelim = "%";
  const omit = "$";
  const space = "\u200B";

  let color = "#fce303"; // yellow

  let embed = new Discord.MessageEmbed().setColor(color);

  try {
    let cmdArgs = args.join(" ").split(sectionDelim);
    let fieldNum = 1;
    for (const arg of cmdArgs) {
      const [title, body] = arg.split(fieldDelim);
      if (title === omit && body === omit) {
        embed = embed.addField(space, space);
      } else if (title === omit && fieldNum === 1) {
        embed = embed.setDescription(body);
      } else if (title === omit) {
        embed = embed.addField(space, body);
      } else if (title === "color") {
        color = body;
      } else if (!title && !body) {
        embed = embed.addField(title, body);
      }
      fieldNum++;
    }
    // message.delete();
  } catch (err) {
    return message.channel.send("hey are you trying to kill me?! <:ahhknife2:823269952240091177>");
  }

  embed = embed.setColor(color);
  message.channel.send(embed);

  // title1%this is the first sentence|title2%this is the second sentence|$%$|title3%this is the third sentence

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);