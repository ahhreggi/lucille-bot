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
      channel.send(embedMsg).then(msg => {
        // TODO: change hard coded emoji (idea: put emoji codes in the config file)
        msg.react("<:eastertaco:827620820473479208>");
        msg.delete({ timeout: 5000 });
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