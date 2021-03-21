require("dotenv").config();

const { Client } = require("discord.js");

const config = require("./config.json");
const { runCommand, parseCommand, getPrompt, respondTo } = require("./utility");
const { allCommands, help } = require("./start");
const messagePrompts = require("./data/prompts");

const client = new Client();

let prefix = config.prefix || "!";

const cmdVars = {
  askReady: true,
  gmReady: true
};

client.on("ready", () => {
  console.log(`${client.user.username} is ALIVE!`);

  // Send a message on connection to channel
  client.channels.fetch(config.channelIds.whyMe)
    .then(channel => channel.send("hey losers, i'm back... with tacos"))
    .catch(console.error);
});

client.on("message", (message) => {

  // Ignore bot messages
  if (message.author.bot) return;

  // Check if the message is a command (starts with prefix), otherwise do nothing
  if (message.content.startsWith(prefix)) {

    // Parse the command and run
    const [cmdName, ...args] = parseCommand(message, prefix);
    const data = { help, cmdVars };
    const response = runCommand(message, allCommands, cmdName, args, data);

    // If there's no response from the command, do nothing
    if (!response) return;

    // Send command response content
    if (response.action === "send") {
      message.channel.send(response.data);

      // Execute return action according to the key
    } else if (response.action === "return") {

      // Trigger 3 sec global cool down on !ask while Lucille is thinking
      if (response.key === "askDelay") {
        cmdVars.askReady = false;
        setTimeout(() => {
          message.channel.send(response.data);
          cmdVars.askReady = true;
        }, 3000);
      }

    }

  } else {

    // If the message is not a command, check for a prompt trigger
    const promptResponse = getPrompt(message.content, messagePrompts);
    if (promptResponse) {
      message.channel.send(promptResponse.replace("%MEMBER%", `${message.member}`));
    }

  }
});

// HARDCODED RESPONSES TO THINGS BC LAZY :( ////////////////////////////////////////////////////////

// // Respond to "hey lucille"
// if (message.content.toLowerCase().startsWith("hey lucille")) {
//   return runCommand(message, allCommands, "ask");
// }

// // Respond to "LUCILLE"
// if (message.content === "LUCILLE") {
//   return message.channel.send("WHAT");
// }

// // Respond to "good morning"
// if (message.content.toLowerCase().startsWith("good morning lucille")) {
//   message.channel.send(`good morning ${message.member}! :)`);
// } else if (message.content.startsWith("<:ahhGM:730258615268540537> lucille") || message.content.startsWith("<:ahhGM:730258615268540537>lucille")) {
//   message.channel.send(`<:ahhGM:730258615268540537> ${message.member}! :)`);
// } else if (gmReady && (message.content.toLowerCase().startsWith("good morning") || message.content.toLowerCase().startsWith("<:ahhGM:730258615268540537>"))) {
//   gmReady = false;
//   message.channel.send("good morning everyone! :)");
//   setTimeout(() => {
//     gmReady = true;
//   }, 300000); // 5 mins
// }

// // Respond to other things
// respondTo(message, "no u", `no u ${message.member}`);
// respondTo(message, "shut up lucille", `no u ${message.member}`);
// respondTo(message, "wake up", "I'M AWAKE D:");
// respondTo(message, "bye", "later nerd");
// respondTo(message, "thanks lucille", "np");
// respondTo(message, "i win", "no u don't");
// respondTo(message, "good night lucille", `good night ${message.member} :)`);
// respondTo(message, "<:ahhpog:797912934549422110>", "<:ahhpog:797912934549422110>");
// respondTo(message, "<:boogie:701313374733991998>", "<:boogie:701313374733991998>");
// respondTo(message, "good afternoon", "good ***morning*** >:(");



client.login(process.env.DISCORD_BOT_TOKEN);