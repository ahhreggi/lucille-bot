require("dotenv").config();

const { Client } = require("discord.js");

const { runCommand, parseCommand, respondTo } = require("./utility");
const { allCommands, help } = require("./start");
const config = require("./config.json");

const client = new Client();

let prefix = config.prefix || "!";
const secret = "a secret message";

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

    if (!response) return;

    if (response.action === "send") {
      message.channel.send(response.data);

    } else if (response.action === "return") {

      if (response.key === "secretKey") {
        console.log("Response action was return");
        message.channel.send(secret);

      } else if (response.key === "askDelay") {
        cmdVars.askReady = false;
        setTimeout(() => {
          message.channel.send(response.data);
          cmdVars.askReady = true;
        }, 3000); // 3 sec delay to *think*

      }
    }
  }

  // HARDCODED RESPONSES TO THINGS BC LAZY :( ////////////////////////////////////////////////////////

  // Respond to "hey lucille"
  if (message.content.toLowerCase().startsWith("hey lucille")) {
    return runCommand(message, allCommands, "ask");
  }

  // Respond to "LUCILLE"
  if (message.content === "LUCILLE") {
    return message.channel.send("WHAT");
  }

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

  // Respond to other things
  respondTo(message, "no u", `no u ${message.member}`);
  respondTo(message, "shut up lucille", `no u ${message.member}`);
  respondTo(message, "wake up", "I'M AWAKE D:");
  respondTo(message, "bye", "later nerd");
  respondTo(message, "thanks lucille", "np");
  respondTo(message, "i win", "no u don't");
  respondTo(message, "good night lucille", `good night ${message.member} :)`);
  respondTo(message, "<:ahhpog:797912934549422110>", "<:ahhpog:797912934549422110>");
  respondTo(message, "<:boogie:701313374733991998>", "<:boogie:701313374733991998>");
  respondTo(message, "good afternoon", "good ***morning*** >:(");

});

client.login(process.env.DISCORD_BOT_TOKEN);