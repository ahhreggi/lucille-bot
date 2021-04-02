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
      // TODO: change hard coded emoji (idea: put emoji codes in the config file)
      msg += `${delim}desc: React with <:eastertaco:827620820473479208> to collect easter tacos`;

      const embedMsg = embed(msg);
      channel.send(embedMsg);
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