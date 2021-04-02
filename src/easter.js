// =======================================================================
// WIP - Easter special feature
// =======================================================================

const { embed } = require("./embed");

const delim = "\\";



const postCollectEggsMessage = (client, channelId) => {
  client.channels.fetch(channelId)
    .then(channel => {
      let msg = "";

      // Title
      msg += `${delim}title: Easter tacos delivery! `;
      // Color
      msg += `${delim}color: yellow `;
      // Description
      msg += `${delim}desc: React to collect easter tacos! Quick, you only have 5 seconds!`;
      // Image (https://imgur.com/a/n0L4sn8)
      msg += `${delim}img: https://imgur.com/hoOqhOr.png`;

      const embedMsg = embed(msg);
      channel.send(embedMsg).then(message => {
        // TODO: change hard coded emoji (idea: put emoji codes in the config file)
        message.react("<:eastertaco:827620820473479208>");
        message.delete({ timeout: 5000 });


        const filter = (reaction, user) => {
          // or check reaction.emoji.id = "827620820473479208"
          return reaction.emoji.name === "eastertaco" && user.id !== message.author.id;
        };

        const collector = message.createReactionCollector(filter, { time: 5000 });

        collector.on("collect", (reaction, user) => {
          channel.send(`Yay ${user}! You collected easter tacos!`);
        });

        collector.on("end", collected => {
          const embedEndMessage = embed(`${delim}title: TIME'S UP! ${delim}color: orange ${delim}desc: ${collected.size} people participated. Don't worry if you miss this delivery, there will be more!`);
          channel.send(embedEndMessage);
        });
      });
    })
    .catch(console.error);
};

const postCollectEggsMessagesAtInterval = (client, channelId, interval) => {
  setInterval(() => {
    postCollectEggsMessage(client, channelId);
  }, interval);
};

module.exports = { postCollectEggsMessagesAtInterval };

// =======================================================================
// END OF WIP
// =======================================================================