const Command = require("../models/command");
const Response = require("../models/response");
const { getMentionedUser } = require("../utility");
const errors = require("./configs/errors");
const pyramidResponses = require("./configs/pyramidResponses");

///////////////////////////////////////////////////////////////////

const name = "pyramid";
const desc = "don't pyramid me bro";
const roles = ["user"];
const alias = [];

const cmdFunction = (message) => {

  const sender = message.member;
  // Check if a user was mentioned, otherwise ask to specify
  const userToPyramid = getMentionedUser(message);
  if (userToPyramid) {
    // Check if the user is in the server, otherwise send an error (user is not in server)
    const memberToPyramid = message.guild.member(userToPyramid);
    if (memberToPyramid) {
      // If the sender tries to pyramid themselves, don't poke
      if (sender === memberToPyramid) {
        message.channel.send(errors.userIsSelf(sender));
      } else {
        const result = pyramidResponses[Math.floor(Math.random() * pyramidResponses.length)];
        message.channel.send(`${sender} tried to pyramid ${memberToPyramid} and ${result}`);
      }
    } else {
      message.channel.send(errors.userNotFound);
    }
  } else {
    message.channel.send(errors.userNotSpecified);
  }

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);