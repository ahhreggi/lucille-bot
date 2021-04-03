// ================================================================================================
// WIP - Easter special feature
//
// DISCLAIMERS:
// - The whole "Easter module" is temporary. It's meant to be deleted after Easter 2021.
// - The code was written very quickly. Many shortcuts have been taken.
// - We deliberately put everything in the same file so that it's easier to delete afterwards.
//   Ideally, this file should be divided into multiple files.
// ================================================================================================



// ================================================================================================
// IMPORTS
// ================================================================================================

const { embed } = require("./embed");



// ================================================================================================
// GLOBAL VARIABLES
// ================================================================================================

// Embed delimiter
const delim = "\\";

const eggEmbedImgUrl = "https://imgur.com/hoOqhOr.png"; // https://imgur.com/a/n0L4sn8

const easterTacoEmoji = {
  id: "827620820473479208",
  name: "eastertaco"
};

// Durations and values of the "collect eggs" embed
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
  }
];



// ================================================================================================
// HELPER FUNCTIONS
// ================================================================================================
const pickRandomEggDuration = () => {
  return eggDurations[Math.floor(Math.random() * eggDurations.length)];
};

/**
 * Simplified version which works with the simple values that are being used in this file. Might
 * not work with any value (because pretty dumb algorithm that does not treat all possible cases
 * deliberately).
 */
const millesecondsToReadableString = (time) => {
  const timeInSeconds = time / 1000;

  if (timeInSeconds < 60) {

    return `${timeInSeconds} seconds`;

  } else if (timeInSeconds === 60) {

    return "1 minute";

  } else {

    const timeInMinutes = timeInSeconds / 60;
    return `${timeInMinutes} minutes`;

  }
};



// ================================================================================================
// MAIN FUNCTIONS
// ================================================================================================

const postCollectEggsMessage = (client, channelId) => {
  client.channels.fetch(channelId)
    .then(channel => {
      // Picking random duration and value in array
      // --------------------------------------------------------------
      const eggDuration = pickRandomEggDuration();


      // Building embed message
      // --------------------------------------------------------------
      let msg = "";

      // Title
      msg += `${delim}title: Easter tacos delivery! `;
      // Color
      msg += `${delim}color: yellow `;
      // Description
      msg += `${delim}desc: React to collect **${eggDuration.value}** easter tacos! Quick, you only have **${millesecondsToReadableString(eggDuration.duration)}**!`;
      // Image
      msg += `${delim}img: ${eggEmbedImgUrl}`;

      const embedMsg = embed(msg);


      // Sending embed message and handling reactions when it's sent
      // --------------------------------------------------------------
      channel.send(embedMsg).then(message => {

        // Setting a delete timeout
        // --------------------------------------------------------------
        message.delete({ timeout: eggDuration.duration });

        // Reacting to own embed so that users will be able to react faster
        // --------------------------------------------------------------
        message.react(`<:${easterTacoEmoji.name}:${easterTacoEmoji.id}>`);

        // Setting up reaction collector
        // --------------------------------------------------------------
        const filter = (reaction, user) => {
          return reaction.emoji.name === easterTacoEmoji.name && user.id !== message.author.id;
        };

        const collector = message.createReactionCollector(filter);

        collector.on("collect", (reaction, user) => {
          channel.send(`Yay ${user}! You successfully collected ${eggDuration.value} easter tacos!`);
        });

        collector.on("end", collected => {
          let endMessage = "";
          endMessage += `${delim}title: TIME'S UP! `;
          endMessage += `${delim}color: orange`;
          endMessage += `${delim}desc: ${collected.size} people participated. Don't worry if you miss this delivery, there will be more!`;

          channel.send(embed(endMessage));
        });
      });
    })
    .catch(console.error);
};



// ================================================================================================
// EXPORTED FUNCTIONS
// ================================================================================================

const postCollectEggsMessagesAtInterval = (client, channelId, interval) => {
  postCollectEggsMessage(client, channelId);
  // Below code is commented for now, make it easier for testing
  /*
  setInterval(() => {
    postCollectEggsMessage(client, channelId);
  }, interval);
  */
};



// ================================================================================================
// EXPORTS
// ================================================================================================

module.exports = { postCollectEggsMessagesAtInterval };