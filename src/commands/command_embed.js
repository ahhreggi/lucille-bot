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
  const color = "#fce303";
  const space = { name: "\u200B", value: "\u200B" };

  const fields = [];

  try {
    let cmdArgs = args.join(" ").split(sectionDelim);
    for (const arg of cmdArgs) {
      const [title, body] = arg.split(fieldDelim);
      if (title === "$" && body === "$") {
        fields.push(space);
      } else {
        fields.push({ name: title, value: body });
      }
    }
    message.delete();
  } catch (err) {
    return message.channel.send("hey are you trying to kill me?! <:ahhknife2:823269952240091177>");
  }

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .addFields(...fields);

  message.channel.send(embed);

  // title1%this is the first sentence|title2%this is the second sentence|$%$|title3%this is the third sentence

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);