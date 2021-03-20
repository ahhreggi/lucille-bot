const errors = require("./errors");
const {
  codeBlock,
  getRoleID,
  getMentionedUser,
  hasRole
} = require("../../utility");

/**
 * Add or remove a role from a mentioned user.
 * @param  {Discord.Message} message
 *         A message received by the client.
 * @param  {string} role
 *         A role to add or remove from the user.
 */
const toggleRole = (message, role) => {
  const roleID = getRoleID(role);
  // Check if a user was mentioned, otherwise ask to specify
  const userToGiveRole = getMentionedUser(message);
  if (userToGiveRole) {
    // Check if the user is in the server, otherwise send an error (user is not in server)
    const member = message.guild.member(userToGiveRole);
    if (member) {
      const memberTag = `${userToGiveRole.tag}`;
      // Check if the user already has the role and add/remove as necessary
      if (hasRole(member, [role])) {
        member.roles.remove(roleID);
        message.channel.send(codeBlock(`- Removed ${role} role from ${memberTag}`));
      } else {
        member.roles.add(roleID);
        message.channel.send(codeBlock(`+ Added ${role} role to ${memberTag}`));
      }
    } else {
      message.channel.send(errors.userNotFound);
    }
  } else {
    message.channel.send(errors.userNotSpecified);
  }
};

module.exports = toggleRole;