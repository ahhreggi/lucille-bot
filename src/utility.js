/**
 * Validates a command, checks the user's permissions, then logs and runs the command.
 * @param    {Discord.Message} message
 *           A message received by the client.
 * @param    {{command: Object}} allCommands
 *           All of the available user commands.
 * @property {string} command.desc
 *           A description of the command.
 * @property {Array.<string>} command.roles
 *           An array of user roles permitted to use the command.
 * @property {Array.<string>} command.alias
 *           An array of command aliases.
 * @property {function} command.cmd
 *           A function used to execute the command.
 * @param    {string} cmdName
 *           A command name sent by the user.
 * @param    {Array.<string>} args
 *           An array of arguments sent by the user.
 * @param    {Object} data
 *           An object containing data to be passed into command functions.
 * @return   {Response|undefined}
 *           A Response object or undefined if a command is not successfully executed.
 */
const runCommand = (message, allCommands, cmdName, args, data) => {
  // Check if the command exists, otherwise check if it's an alias
  if (Object.keys(allCommands).includes(cmdName)) {
    const { roles, cmd } = allCommands[cmdName];
    if (hasRole(message.member, roles)) {
      // Log possibly valid commands to console
      console.log(`${message.author.tag}: < ${cmdName} > | ${args}`);
      // Run command
      return cmd(message, args, data);
    } else {
      console.log(`NO PERMS: ${message.author.tag}: < ${cmdName} > | ${args}`);
    }
  } else {
    // If the command is an alias, identify and run the command it corresponds to
    const allAliases = getAliases(allCommands);
    if (allAliases.includes(cmdName)) {
      const aliasCmdName = getAliasCommand(cmdName, allCommands);
      return runCommand(message, allCommands, aliasCmdName, args, data);
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
 * Returns an array containing the aliases of all commands.
 * @param    {{command: Object}} allCommands
 *           All of the available user commands.
 * @property {string} command.desc
 *           A description of the command.
 * @property {Array.<string>} command.roles
 *           An array of user roles permitted to use the command.
 * @property {Array.<string>} command.alias
 *           An array of command aliases.
 * @property {function} command.cmd
 *           A function used to execute the command.
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
 * @param    {{command: Object}} allCommands
 *           All of the available user commands.
 * @property {string} command.desc
 *           A description of the command.
 * @property {Array.<string>} command.roles
 *           An array of user roles permitted to use the command.
 * @property {Array.<string>} command.alias
 *           An array of command aliases.
 * @property {function} command.cmd
 *           A function used to execute the command.
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
 * @return {Discord.User|undefined}
 *         A user who was mentioned first within the message, or undefined if none.
 */
const getMentionedUser = (message) => {
  return message.mentions.users.first();
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

/**
 * Returns a random response string if a message contains a prompt trigger, false otherwise.
 * @param  {string} message
 *         The content of a message
 * @param  {Array.<{triggers: [string], responses: [string]}>}
 *         An array of objects containing prompt triggers and their associated responses.
 * @return {string|boolean}
 *         A random response or false if the message contained no triggers.
 */
const getPrompt = (message, prompts) => {
  let promptResponse = false;

  for (const key in prompts) {
    const caseSensitive = prompts[key].caseSensitive;
    const rule = prompts[key].rule;
    const triggers = prompts[key].triggers;
    const responses = prompts[key].responses;

    for (let trigger of triggers) {
      // If not case sensitive, convert both strings to upper case
      if (!caseSensitive) {
        message = message.toUpperCase();
        trigger = trigger.toUpperCase();
      }

      // Compare strings according to the rule. By default, exact comparison is used.
      // That's why, there's no check on "exact". Should be added if a new rule is added.
      const compare = (str1, str2) => {
        if (rule === "includes") {
          return str1.includes(str2);
        } else {
          return str1 === str2;
        }
      };

      if (compare(message, trigger)) {
        promptResponse = responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  return promptResponse;
};

module.exports = {
  runCommand,
  parseCommand,
  codeBlock,
  getRoleID,
  getMentionedUser,
  getSenderVars,
  hasRole,
  getPrompt
};