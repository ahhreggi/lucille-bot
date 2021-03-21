const Discord = require("discord.js");
const Command = require("../models/command");
const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "embed";
const desc = "posts an embed";
const roles = ["admin", "vip"];
const alias = [];

const cmdFunction = (message, args) => {

  const sectionDelim = "|";
  const fieldDelim = "%";
  const omit = "$";
  const space = "\u200B";

  let color = "#fce303"; // yellow

  const fields = [];

  try {
    let cmdArgs = args.join(" ").split(sectionDelim);
    for (const arg of cmdArgs) {
      const [title, body] = arg.split(fieldDelim);
      if (title === "color" && body.startsWith("#")) {
        color = body;
      } else if (title === omit && body === omit) {
        fields.push({ name: space, value: space });
      } else if (title === omit) {
        fields.push({ name: space, value: body });
      } else if (title && body) {
        fields.push({ name: title, value: body });
      }
    }
    // message.delete();
  } catch (err) {
    return message.channel.send("hey are you trying to kill me?! <:ahhknife2:823269952240091177>");
  }

  if (!fields.length) {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .addFields(...fields);
    message.channel.send(embed);
  } else {
    message.channel.send("incorrect syntax bro, here's an example:");
    message.channel.send(codeBlock("!embed color%#339FFF|title1%this is the first sentence|$%$|title2%this is the second sentence"));
  }

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);