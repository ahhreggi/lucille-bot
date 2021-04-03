// ==========================================================================
// WIP - Easter special feature
//
// DISCLAIMER: we deliberately put everything in the same file so that
//             it's easier to delete afterwards. Ideally, this file should
//             be divided into multiple files.
//             Also, the code here was written very quickly. Many shortcuts
//             have been taken.
// ==========================================================================

const { embed } = require("./embed");

const delim = "\\";

const eggDurations = [
  {
    duration: 10000, // 10 seconds
    value: 500
  },
  {
    duration: 15000, // 15 seconds
    value: 200
  },
  {
    duration: 30000, // 30 seconds
    value: 100
  },
  {
    duration: 60000, // 1 minute
    value: 50
  },
  {
    duration: 120000, // 2 minutes
    value: 25
  },
  {
    duration: 180000, // 3 minutes
    value: 10
  },
  {
    duration: 300000, // 5 minutes
    value: 5
  },
  {
    duration: 600000, // 10 minutes
    value: 1
  }
];

const pickRandomEggDuration = () => {
  return eggDurations[Math.floor(Math.random() * eggDurations.length)];
};


const postCollectEggsMessage = (client, channelId) => {
  client.channels.fetch(channelId)
    .then(channel => {
      const eggDuration = pickRandomEggDuration();

      let msg = "";

      // Title
      msg += `${delim}title: Easter tacos delivery! `;
      // Color
      msg += `${delim}color: yellow `;
      // Description
      msg += `${delim}desc: React to collect **${eggDuration.value}** easter tacos! Quick, you only have **${millesecondsToReadableString(eggDuration.duration)}**!`;
      // Image (https://imgur.com/a/n0L4sn8)
      msg += `${delim}img: https://imgur.com/hoOqhOr.png`;

      const embedMsg = embed(msg);
      channel.send(embedMsg).then(message => {
        // TODO: change hard coded emoji (idea: put emoji codes in the config file)
        message.react("<:eastertaco:827620820473479208>");
        message.delete({ timeout: eggDuration.duration });


        const filter = (reaction, user) => {
          // or check reaction.emoji.id = "827620820473479208"
          return reaction.emoji.name === "eastertaco" && user.id !== message.author.id;
        };

        const collector = message.createReactionCollector(filter);

        collector.on("collect", (reaction, user) => {
          channel.send(`Yay ${user}! You successfully collected ${eggDuration.value} easter tacos!`);
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
  postCollectEggsMessage(client, channelId);
  // Below code is commented for now, easier for testing
  /*
  setInterval(() => {
    postCollectEggsMessage(client, channelId);
  }, interval);
  */
};

// Simplified version which works with the simple values that are being used in this file.
// Might not work with any value (because pretty dumb algorithm that does not treat all
// possible cases deliberately)
const millesecondsToReadableString = (time) => {
  const timeInSeconds = time / 1000;

  if (timeInSeconds < 60) {

    return `${timeInSeconds} seconds`;

  } else if (timeInSeconds === 60) {

    return "1 minutes";

  } else {

    const timeInMinutes = timeInSeconds / 60;
    return `${timeInMinutes} minutes`;

  }
};

module.exports = { postCollectEggsMessagesAtInterval };

// =======================================================================
// END OF WIP
// =======================================================================