const Command = require("../models/command");
const { getMentionedUser } = require("../utility");
const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "hug";
const desc = "hug a user";
const roles = ["user"];
const alias = [];

const cmdFunction = (message) => {

  const sender = message.member;
  // Check if a user was mentioned, otherwise ask to specify
  const userToHug = getMentionedUser(message);
  if (userToHug) {
    // Check if the user is in the server, otherwise send an error (user is not in server)
    const memberToHug = message.guild.member(userToHug);
    if (memberToHug) {
      // If the sender tries to hug themselves, don't hug
      if (sender === memberToHug) {
        message.channel.send(errors.userIsSelf(sender));
      } else {
        message.channel.send(`${sender.displayName} gave a hug to ${memberToHug.displayName}! <3`);
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