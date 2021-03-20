const Command = require("../command");
const { hasRole, getMentionedUser } = require("../utility");
const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "kick";
const desc = "kick a target user";
const roles = ["admin"];
const alias = [];

const cmdFunction = (message) => {

  const sender = message.member;
  // Check if a user was mentioned, otherwise ask to specify
  const userToKick = getMentionedUser(message);
  if (userToKick) {
    // Check if the user is in the server, otherwise send an error (user is not in server)
    const memberToKick = message.guild.member(userToKick);
    if (memberToKick) {
      // If the sender tries to kick themselves, don't kick
      if (sender === memberToKick) {
        message.channel.send(errors.userIsSelf(sender));
        // If the target to kick is a mod, don't kick (considered a higher role)
      } else if (hasRole(memberToKick, ["mod"])) {
        message.channel.send(errors.userIsMod(sender, memberToKick));
        // Kick the target, otherwise send an error (user is probably a higher role)
      } else {
        memberToKick
          .kick()
          .then(() => {
            message.channel.send(`${memberToKick} (${userToKick.tag}) was kicked.`);
          })
          .catch(err => {
            message.channel.send(errors.userIsMod(sender, memberToKick));
            console.error(err);
          });
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