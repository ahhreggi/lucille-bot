// ================================================================================================
// WIP - Easter special feature
//
// DISCLAIMERS:
// - The whole "Easter module" is temporary. It's meant to be deleted after Easter 2021.
// - The code was written very quickly. Many shortcuts have been taken.
// - We deliberately put everything in the same file so that it's easier to delete afterwards.
//   Ideally, this file should be divided into multiple files.
//
// NOTES:
// - "Easter tacos" and "eggs" are used interchangeably here. They are the same thing.
// ================================================================================================





// ================================================================================================
// IMPORTS
// ================================================================================================

const { embed } = require("./embed");





// ================================================================================================
// MODEL CLASSES
// ================================================================================================
class User {
  constructor(discordUser, eggsCount, participationCount) {
    this.discordUser = discordUser; // Discord user object
    this.eggsCount = eggsCount; // the number of eggs the user currently has
    this.participationCount = participationCount; // how many times the user has participated in a delivery
  }
}

class Delivery {
  constructor(duration, count) {
    this.duration = duration;
    this.count = count;
  }
}





// ================================================================================================
// MAIN CLASS
// ================================================================================================
class Easter {
  constructor(db, client, channelId, interval) {
    this.db = db;
    this.client = client;
    this.channelId = channelId;
    this.interval = interval;

    this.usersCollection = this.db.collection("users");
    this.deliveriesCollection = this.db.collection("deliveries");
  }

  // ------------------------------------------------------------------------------------
  // STATIC FIELDS
  // ------------------------------------------------------------------------------------

  // Embed delimiter
  delim = "\\";

  eggEmbedImgUrl = "https://imgur.com/hoOqhOr.png"; // https://imgur.com/a/n0L4sn8

  easterTacoEmoji = {
    id: "827620820473479208",
    name: "eastertaco"
  };

  // Durations and values of the "collect eggs" embed
  eggDurations = [
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



  // ------------------------------------------------------------------------------------
  // DATABASE HELPER FUNCTIONS
  // ------------------------------------------------------------------------------------

  insertOrUpdateUser = (user, newAmount) => {
    // TODO (ignore commented code below)

    /*
    console.log("======================");
    // Check if user already exist
    this.usersCollection.findOne({"user.id": user.id}, {}, (param1, param2) => {
      console.log("param1 " + param1);
      console.log("param2 " + param2);
    })
    .then(result => console.log("then insertOrUpdateUser " + result))
    .catch(err => console.log(err));

    // If so, update

    // Else, insert
    // TODOdb.collection("userEggs").insertOne(userEgg);
    */
    return new User(user, newAmount, 1);
  };

  insertDelivery = (delivery) => {
    // TODO
  };

  getUserEggsCount = (userDiscordId) => {
    // TODO
  };



  // ------------------------------------------------------------------------------------
  // OTHER HELPER FUNCTIONS
  // ------------------------------------------------------------------------------------

  pickRandomEggDuration = () => {
    return this.eggDurations[Math.floor(Math.random() * this.eggDurations.length)];
  };

  /**
   * Simplified version which works with the simple values that are being used in this file. Might
   * not work with any value (because pretty dumb algorithm that does not treat all possible cases
   * deliberately).
   */
  millesecondsToReadableString = (time) => {
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



  // ------------------------------------------------------------------------------------
  // MAIN FUNCTIONS
  // ------------------------------------------------------------------------------------

  postCollectEggsMessage = () => {
    this.client.channels.fetch(this.channelId)
      .then(channel => {
        // Picking random duration and value in array
        // --------------------------------------------------------------
        const eggDuration = this.pickRandomEggDuration();


        // Building embed message
        // --------------------------------------------------------------
        let msg = "";

        // Title
        msg += `${this.delim}title: Easter tacos delivery! `;
        // Color
        msg += `${this.delim}color: yellow `;
        // Description
        msg += `${this.delim}desc: React to collect **${eggDuration.value}** easter tacos! Quick, you only have **${this.millesecondsToReadableString(eggDuration.duration)}**!`;
        // Image
        msg += `${this.delim}img: ${this.eggEmbedImgUrl}`;

        const embedMsg = embed(msg);


        // Sending embed message and handling reactions when it's sent
        // --------------------------------------------------------------
        channel.send(embedMsg).then(message => {

          // Setting a delete timeout
          // --------------------------------------------------------------
          message.delete({ timeout: eggDuration.duration });

          // Reacting to own embed so that users will be able to react faster
          // --------------------------------------------------------------
          message.react(`<:${this.easterTacoEmoji.name}:${this.easterTacoEmoji.id}>`);

          // Setting up reaction collector
          // --------------------------------------------------------------
          const filter = (reaction, user) => {
            return reaction.emoji.name === this.easterTacoEmoji.name && user.id !== message.author.id;
          };

          const collector = message.createReactionCollector(filter);

          collector.on("collect", (reaction, user) => {
            const savedUser = this.insertOrUpdateUser(user, eggDuration.value);

            channel.send(`Yay ${user}! You successfully collected ${eggDuration.value} easter tacos! You now have **${savedUser.eggsCount} easter tacos**.`);
          });

          collector.on("end", collected => {
            let endMessage = "";
            endMessage += `${this.delim}title: TIME'S UP! `;
            endMessage += `${this.delim}color: orange`;
            endMessage += `${this.delim}desc: ${collected.size} people participated. Don't worry if you miss this delivery, there will be more!`;

            channel.send(embed(endMessage));
          });
        });
      })
      .catch(console.error);
  };

  run = () => {
    this.postCollectEggsMessage();
    // Below code is commented for now, make it easier for testing
    /*
    setInterval(() => {
      this.postCollectEggsMessage();
    }, this.interval);
    */
  };
}






// ================================================================================================
// EXPORTS
// ================================================================================================

module.exports = Easter;