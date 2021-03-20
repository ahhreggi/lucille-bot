const Command = require("../command");
const { getMentionedUser } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "perms";
const desc = "check mod action perms";
const roles = ["user"];
const alias = ["checkperms"];

const cmdFunction = (message) => {

  const sender = message.member;
  const mentionedUser = getMentionedUser(message);
  const targetUser = mentionedUser ? message.guild.member(mentionedUser) : sender;
  let result = "\nkick: " + targetUser.hasPermission("KICK_MEMBERS");
  result += "\nban: " + targetUser.hasPermission("BAN_MEMBERS");
  result += "\nmanage roles: " + targetUser.hasPermission("MANAGE_ROLES");
  result += "\nmanage nicknames: " + targetUser.hasPermission("MANAGE_NICKNAMES");
  message.channel.send(codeBlock(`[PERMISSIONS FOR ${mentionedUser ? mentionedUser.tag : sender.user.tag}]\n${result}`));

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);