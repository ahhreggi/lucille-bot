const Command = require("../models/command");
const { getMentionedUser } = require("../utility");
const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "poke";
const desc = "poke a user";
const roles = ["user"];
const alias = [];

const cmdFunction = (message) => {

  const sender = message.member;
  // Check if a user was mentioned, otherwise ask to specify
  const userToPoke = getMentionedUser(message);
  if (userToPoke) {
    // Check if the user is in the server, otherwise send an error (user is not in server)
    const memberToPoke = message.guild.member(userToPoke);
    if (memberToPoke) {
      // If the sender tries to poke themselves, don't poke
      if (sender === memberToPoke) {
        message.channel.send(errors.userIsSelf(sender));
      } else {
        message.channel.send(`${sender.displayName} poked ${memberToPoke.displayName} D:`);
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