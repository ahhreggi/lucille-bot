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

const cmdFunction = (message) => {

  const embed = new Discord.MessageEmbed()
    .setColor("#fce303")
    .setTitle("This is the title")
    .setURL("https://google.ca")
    .setAuthor("Lucille", "https://i.imgur.com/pbrZNDp.jpg", "https://github.com/ahhreggi/lucille-bot")
    .setDescription("i love tacos")
    .setThumbnail("https://i.imgur.com/pbrZNDp.jpg")
    .addFields(
      { name: "Regular field title", value: "Some value here" },
      { name: "\u200B", value: "\u200B" },
      { name: "Inline field title1", value: "Some value here1", inline: true },
      { name: "Inline field title2", value: "Some value here2", inline: true },
    )
    .addField("Inline field title", "Some value here", true)
    .setImage("https://i.imgur.com/pbrZNDp.jpg")
    .setTimestamp()
    .setFooter("Some footer text here", "https://i.imgur.com/pbrZNDp.jpg");

  message.channel.send(embed);

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);