require("dotenv").config();

const { Client } = require("discord.js");

const config = require("./config.json");
const { runCommand, parseCommand, getPrompt } = require("./utility");
const { allCommands, help } = require("./setup");
const messagePrompts = require("./data/prompts");

const client = new Client();

let prefix = config.prefix || "!";

// Variables controlled by command response keys
const cmdVars = {
  askReady: true
};

client.once("ready", () => {
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

    // If there's no Response object from the command, do nothing
    if (!response) return;

    // GLOBAL RESPONSE KEY HANDLERS //////////////////////////////////////

    // !ask - Trigger 3 sec global cool down while Lucille is thinking
    if (response.key === "askDelay") {
      cmdVars.askReady = false;
      setTimeout(() => {
        message.channel.send(response.content);
        cmdVars.askReady = true;
      }, 3000);
    }

    //////////////////////////////////////////////////////////////////////

  } else {

    // If the message is not a command, check for a prompt trigger
    const promptResponse = getPrompt(message.content, messagePrompts);

    if (promptResponse) {

      // Response triggers a command (cannot pass args)
      if (promptResponse.startsWith(prefix)) {
        const cmdName = promptResponse.slice(1);
        const data = { help, cmdVars };
        return runCommand(message, allCommands, cmdName, ["!prompt"], data);
      }

      // Regular response
      message.channel.send(promptResponse.replace("%MEMBER%", `${message.member}`));

    }

  }

});

client.login(process.env.DISCORD_BOT_TOKEN);