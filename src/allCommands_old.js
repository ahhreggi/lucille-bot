// TODO: Move these into individual command_NAME.js files within the commands directory

const errors = require("./commands/configs/errors");

const {
  codeBlock,
  getMentionedUser,
  getSenderVars,
  hasRole
} = require("./utility");

let askReady = true; // for preventing !ask while one is in progress (3 sec)
const askResponses = {
  thinking: [
    "hmm...",
    "uhhhhh...",
    "one sec...",
    "ehhhh...",
    "let me think about it...",
    "shh let me think!!",
    "umm...",
    "lemme see...",
    "first add the 7, carry the 1, add that, mhmm...",
    "processing...",
    "give me a sec to think about it...",
    "good question! uhh...",
    "let me check real quick...",
    "are you sure you want an answer to that? okay...",
    "hold still...",
    "i mean... since you asked so nicely..."
  ],
  answer: [
    "sure!",
    "ya right",
    "i refuse to answer >:(",
    "yes!!",
    "i think so yea",
    "perhaps maybe quite possibly",
    "ask me later, i'm eating tacos rn",
    "pfffftftpfhpfhfttfhthhthffpfffth",
    "honestly idk lol sry xd",
    "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
    "ok ya definitely not lol",
    "ok",
    "no",
    "on second thought i gtg bye",
    "420",
    "69",
    "over 9000",
    "don't ask me, i'm just a bot... or am i O_O",
    "no u",
    "42",
    "google is your friend :)",
    "duh",
    "ask me again pls i wasn't paying attention",
    "can't answer, cranking 90s rn",
    "that sounds like a you problem",
    "i don't feel like answering that... sorry not sorry xd",
    "i'm busy right now, can i ignore you another time?",
    "i'd agree with you but then we'd both be wrong",
    "idk but what i do know is that supsup is the best :)"
  ]
};

const pyramidOutcomes = [
  "won :D",
  "lost D:",
  "got rekt xd",
  "got sniped D:",
  "died to fall damage",
  "got sent to the lobby",
  "got destroyed lmao"
];

// {commandName: {
//   desc: "a short description of the command",
//   permittedRoles: an array of "admin", "mod", "vip", "sub" (use ["user"] for all users)
//   alias: an array of other ways to trigger the command (e.g., "!cmds", "!c")
//   cmd: a function to execute the command
//   }
// }
const allCommands = {
  ask: {
    desc: "ask a question and lucille will answer... maybe",
    permittedRoles: ["user"],
    alias: ["heylucille"],
    cmd: (message) => {
      if (!askReady) return;
      askReady = false;
      const thinking = askResponses.thinking[Math.floor(Math.random() * askResponses.thinking.length)];
      const answer = askResponses.answer[Math.floor(Math.random() * askResponses.answer.length)];
      message.channel.send(thinking);
      setTimeout(() => {
        message.channel.send(`${message.member} ${answer}`);
        askReady = true;
      }, 3000); // 3 sec delay to *think*
    }
  },
  bot: {
    desc: "toggle bot role for a target user",
    permittedRoles: ["admin"],
    alias: [],
    cmd: (message) => toggleRole(message, "bot")
  },
  commands: {
    desc: "list all commands",
    permittedRoles: ["user"],
    alias: ["cmds"],
    cmd: (message) => {
      message.channel.send("**Available commands:**\n" + Object.keys(allCommands)
        .map(c => {
          const desc = allCommands[c].desc;
          const alias = allCommands[c].alias;
          const roles = allCommands[c].roles;
          const result = `\`!${c}${alias.length > 0 ? `|${alias.join("|")}` : ""}\`` +
            ` --- ${desc} (${roles.join(", ")})`;
          return result;
        })
        .join("\n"));
    }
  },
  discordjs: {
    desc: "list discordjs info",
    permittedRoles: ["user"],
    alias: ["djs"],
    cmd: (message) => {
      const senderVars = getSenderVars(message);
      message.channel.send(codeBlock(`[DISCORDJS INFO FOR ${senderVars.senderTag}]\n\n` + Object.keys(senderVars)
        .map(key => `${key}: ${senderVars[key]}`)
        .join("\n")));
    }
  },
  kick: {
    desc: "kick a target user",
    permittedRoles: ["admin"],
    alias: [],
    cmd: (message) => {
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
    }
  },
  mod: {
    desc: "toggle mod role for a target user",
    permittedRoles: ["admin"],
    alias: [],
    cmd: (message) => toggleRole(message, "mod")
  },
  perms: {
    desc: "check mod action perms",
    permittedRoles: ["user"],
    alias: ["checkperms"],
    cmd: (message) => {
      const sender = message.member;
      const mentionedUser = getMentionedUser(message);
      const targetUser = mentionedUser ? message.guild.member(mentionedUser) : sender;
      let result = "\nkick: " + targetUser.hasPermission("KICK_MEMBERS");
      result += "\nban: " + targetUser.hasPermission("BAN_MEMBERS");
      result += "\nmanage roles: " + targetUser.hasPermission("MANAGE_ROLES");
      result += "\nmanage nicknames: " + targetUser.hasPermission("MANAGE_NICKNAMES");
      message.channel.send(codeBlock(`[PERMISSIONS FOR ${mentionedUser ? mentionedUser.tag : sender.user.tag}]\n${result}`));
    }
  },
  poke: {
    desc: "poke a user",
    permittedRoles: ["user"],
    alias: [],
    cmd: (message) => {
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
    }
  },
  pretendegrees: {
    desc: "convert pretendegrees (°F) into real degrees (°C)",
    permittedRoles: ["user"],
    alias: [],
    cmd: (message, args) => {
      const sender = message.member;
      // Convert message content into a float
      const fahrenheit = parseFloat(args[0]);
      // Check if fahrenheit value is a number, otherwise ask for a real number
      if (!isNaN(fahrenheit)) {
        const celsius = (fahrenheit - 32) * (5 / 9);
        message.channel.send(`${sender} ${fahrenheit} pretendegrees (°F) is ${celsius.toFixed(1)}°C`);
      } else {
        message.channel.send("enter a real number bro");
      }
    }
  },
  pyramid: {
    desc: "don't pyramid me bro",
    permittedRoles: ["user"],
    alias: [],
    cmd: (message) => {
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
            const result = pyramidOutcomes[Math.floor(Math.random() * pyramidOutcomes.length)];
            message.channel.send(`${sender} tried to pyramid ${memberToPyramid} and ${result}`);
          }
        } else {
          message.channel.send(errors.userNotFound);
        }
      } else {
        message.channel.send(errors.userNotSpecified);
      }
    }
  },
  say: {
    desc: "lucille see, lucille do",
    permittedRoles: ["admin", "mod", "vip"],
    alias: [],
    cmd: (message, args) => message.channel.send(args.join(" "))
  },
  vip: {
    desc: "toggle vip role for a target user",
    permittedRoles: ["admin"],
    alias: [],
    cmd: (message) => toggleRole(message, "vip")
  }
};

module.exports = allCommands;