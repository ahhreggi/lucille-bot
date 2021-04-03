require("dotenv").config();

const { Client } = require("discord.js");
const MongoClient = require("mongodb").MongoClient;

const config = require("./config.json");
const { runCommand, parseCommand, getPrompt } = require("./utility");
const { embed } = require("./embed");
const { allCommands, help } = require("./setup");
const messagePrompts = require("./data/prompts");
const Easter = require("./easter");

const client = new Client();

let prefix = config.prefix || "!";

let delim = "\\";

// Global variables used or altered by commands
const cmdVars = {
  askReady: true
};

let easter;

client.once("ready", () => {
  console.log(`${client.user.username} is ALIVE!`);

  // Send a message on connection to channel
  client.channels.fetch(config.channelIds.whyMe)
    .then(channel => {
      const msg = `${delim}title: hey losers, i'm back... with tacos ${delim}color: yellow`;
      const embedMsg = embed(msg);
      channel.send(embedMsg);
    })
    .catch(console.error);


  // =======================================================================
  // WIP - Easter special feature
  // =======================================================================

  // Database
  const dbUri = "mongodb://localhost:27017";
  const dbName = "easterTacoDB";
  let db;

  // DISCLAIMER: very very bad way of passing database
  MongoClient.connect(dbUri, { useUnifiedTopology: true }, (err, cli) => {
    db = cli.db(dbName);

    easter = new Easter(db, client);
    easter.run();
  });

  // =======================================================================
  // END OF WIP
  // =======================================================================


});

client.on("message", (message) => {

  // Ignore bot messages
  if (message.author.bot) return;

  // If the guild is null, it's a DM
  // TODO: double check if that's actually the case
  if (message.guild === null) {
    return message.channel.send("don't DM me bro");
  }

  let response;

  do {

    // Check if the message is a command (starts with prefix)
    if (message.content.startsWith(prefix) || response) {

      // If there's no response yet, run the command
      if (!response) {
        // Parse the command and run
        let [cmdName, ...args] = parseCommand(message, prefix);

        // Redirecting Easter special commands to Easter module
        if (cmdName.startsWith("easter")) {

          easter.runCommand(message, cmdName, args);

        // Handling other commands the usual way
        } else {

          const data = { help, cmdVars, trigger: null };
          response = runCommand(message, allCommands, cmdName, args, data);

        }

      }

      // If there's still no Response object from the command, exit
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

      return;

      //////////////////////////////////////////////////////////////////////

    } else {

      // If the message is not a command, check for a prompt trigger
      const promptResponse = getPrompt(message.content, messagePrompts);

      if (promptResponse) {

        // Response triggers a command (cannot pass args) then pottentially loops back to response key handler
        if (promptResponse.startsWith(prefix)) {
          const [promptCmd, trigger] = promptResponse.slice(1).split(":");
          const data = { help, cmdVars, trigger };
          response = runCommand(message, allCommands, promptCmd, ["!prompt"], data);

        } else {

          // Response triggers a regular message (no loop)
          return message.channel.send(promptResponse.replace("%MEMBER%", `${message.member}`));

        }

      }

    }

  } while (response);

});


client.login(process.env.DISCORD_BOT_TOKEN);