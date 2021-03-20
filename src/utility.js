const errors = require("./errors");

/**
 * Validates a command, checks the user's permissions, then logs and runs the command.
 * @param    {Discord.Message} message
 *           A message received by the client.
 * @param    {Object} allCommands
 *           All of the available user commands.
 * @property {string} allCommands.desc
 *           A description of the command.
 * @property {Array.<string>} allCommands.roles
 *           An array of user roles permitted to use the command.
 * @property {Array.<string>} allCommands.alias
 *           An array of command aliases.
 * @property {function} allCommands.cmd
 *           A function used to execute the command.
 * @param    {string} cmdName
 *           A command name sent by the user.
 * @param    {Array.<string>} args
 *           An array of arguments sent by the user.
 */
const runCommand = (message, allCommands, cmdName, args) => {
  // Check if the command exists, otherwise check if it's an alias
  if (Object.keys(allCommands).includes(cmdName)) {
    const { roles, cmd } = allCommands[cmdName];
    if (hasRole(message.member, roles)) {
      // Log possibly valid commands to console
      console.log(`${message.author.tag}: < ${cmdName} > | ${args}`);
      // Run command
      cmd(message, args);
    } else {
      console.log(`NO PERMS: ${message.author.tag}: < ${cmdName} > | ${args}`);
    }
  } else {
    // If the command is an alias, identify and run the command it corresponds to
    const allAliases = getAliases(allCommands);
    if (allAliases.includes(cmdName)) {
      const aliasCmdName = getAliasCommand(cmdName, allCommands);
      runCommand(message, allCommands, aliasCmdName, args);
    }
  }
};

/**
 * Returns an array containing the command name and arguments of a message.
 * @param  {Discord.Message} message
 *         A message received by the client.
 * @param  {string} prefix
 *         A string marking the start of a command.
 * @return {Array.<string, [string]>}
 *         An array containing the name and arguments of a command.
 */
const parseCommand = (message, prefix) => {
  return message.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/); // match all whitespaces
};

/**
 * Responds to a message that starts with a given string using the given response.
 * @param  {Discord.Message} message
 *         A message received by the client.
 * @param  {string} startsWith
 *         A substring of a message to respond to.
 * @param  {string} response
 *         A string to respond with.
 */
const respondTo = (message, startsWith, response) => {
  if (message.content.toLowerCase().startsWith(startsWith)) {
    return message.channel.send(response);
  }
};

/**
 * Returns an array containing the aliases of all commands.
 * @param    {Object} allCommands
 *           All of the available user commands.
 * @property {string} allCommands.desc
 *           A description of the command.
 * @property {Array.<string>} allCommands.roles
 *           An array of user roles permitted to use the command.
 * @return   {<Array.<string>>}
 *           An array of all command aliases.
 */
const getAliases = (allCommands) => {
  const allAliases = [];
  for (const command in allCommands) {
    const aliasArray = allCommands[command].alias;
    if (aliasArray.length > 0) {
      allAliases.push(...aliasArray);
    }
  }
  return allAliases;
};

/**
 * Return the name of the command that an alias corresponds to.
 * @param    {string} alias
 * @param    {Object} allCommands
 *           All of the available user commands.
 * @property {string} allCommands.desc
 *           A description of the command.
 * @property {Array.<string>} allCommands.roles
 *           An array of user roles permitted to use the command.
 * @return   {string}
 *           The original name of a command.
 */
const getAliasCommand = (alias, allCommands) => {
  for (const command in allCommands) {
    if (allCommands[command].alias.includes(alias)) {
      return command;
    }
  }
};

/**
 * Wraps a string of text in a code block.
 * @param  {string} text
 *         A string of text to wrap.
 * @return {string}
 *         A string of text formatted to display a code block (markdown).
 */
const codeBlock = (text) => {
  return "```" + text + "```";
};

/**
 * Returns the role ID of a given role (from .env variables).
 * @param  {string} role
 *         A role to retrieve an ID for.
 * @return {string}
 *         A string containing the ID of the given role.
 */
const getRoleID = (role) => {
  let target;
  if (role === "admin") {
    target = process.env.ID_ROLE_ADMIN;
  } else if (role === "lucille") {
    target = process.env.ID_ROLE_LUCILLEBOT;
  } else if (role === "mod") {
    target = process.env.ID_ROLE_MOD;
  } else if (role === "bot") {
    target = process.env.ID_ROLE_BOT;
  } else if (role === "vip") {
    target = process.env.ID_ROLE_VIP;
  } else if (role === "sub") {
    target = process.env.ID_ROLE_SUB;
  }
  return target;
};

/**
 * Returns the first mentioned user of a message.
 * @param  {Discord.Message} message
 *         A message received by the client.
 * @return {Discord.User||undefined}
 *         A user who was mentioned first within the message, or undefined if none.
 */
const getMentionedUser = (message) => {
  return message.mentions.users.first();
};

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

/**
 * Returns an object containing various properties of a message sender.
 * @param  {Discord.Message} message
 *         A message received from the client.
 * @return {{sender: Discord.Member, senderID: string, senderTag: string, senderNickname: string}}
 *         An object containing various properties of the given message's sender.
 */
const getSenderVars = (message) => {
  return {
    sender: message.member,
    senderID: message.member.id,
    senderTag: message.member.user.tag,
    senderNickname: message.member.displayName
  };
};

/**
 * Returns an array of a user's role.
 * @param  {Discord.Member} user
 *         A user to retrieve roles for.
 * @return {Array.<string>}
 *         An array of roles assigned to the user.
 */
const getUserRoles = (user) => {
  const roleIDs = user.roles.cache.map(r => r.id); // role IDs (all unique)
  // const roleNames = user.roles.cache.map(r => r.name); // role names (can have duplicates)
  return roleIDs;
};

/**
 * Returns true if a given user has at least one of the given roles, false otherwise.
 * @param  {Discord.Member} user
 *         A user to check the roles of.
 * @param  {Array.<string>} roles
 *         An array of roles.
 * @return {boolean}
 *         A boolean indicating whether or not the user as one of the given roles.
 */
const hasRole = (user, roles) => {
  if (roles.includes("user")) {
    return true;
  } else {
    const userRoles = getUserRoles(user);
    for (const role of roles) {
      const roleID = getRoleID(role);
      if (userRoles.includes(roleID)) {
        return true;
      }
    }
  }
  return false;
};

module.exports = {
  runCommand,
  parseCommand,
  respondTo,
  codeBlock,
  getMentionedUser,
  getSenderVars,
  hasRole,
  toggleRole
};