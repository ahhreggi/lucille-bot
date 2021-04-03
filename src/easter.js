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
const deliveryTypes = [
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

const usersCollectionName = "users";
const deliveriesCollectionName = "deliveries";





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
  // ------------------------------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------------------------------

  constructor(db, client, channelId, interval) {
    this.db = db;
    this.client = client;
    this.channelId = channelId;
    this.interval = interval;

    // Shortcuts
    this.usersCollection = this.db.collection(usersCollectionName);
    this.deliveriesCollection = this.db.collection(deliveriesCollectionName);
  }



  // ------------------------------------------------------------------------------------
  // Database helper function
  // ------------------------------------------------------------------------------------

  insertOrUpdateUser(user, amount, callback) {
    // Check if user already exist
    this.usersCollection.findOne({"discordUser.id": user.id}, {}, (findErr, findRes) => {
      if (findErr !== null) {
        console.log(findErr);
      }

      // No entry have been found, insert
      if (findRes === null) {
        const userToInsert = new User(user, amount, 1);
        this.usersCollection.insertOne(userToInsert, {}, (insErr, insRes) => { // eslint-disable-line no-unused-vars
          if (insErr === null) {
            callback(userToInsert);
          } else {
            console.log("INSERT ERR");
            console.log(insErr);
          }
        });
      } else { // update
        const newAmount = findRes.eggsCount + amount;
        const newParticipantCount = ++findRes.participationCount;

        this.usersCollection.updateOne({ "_id": findRes._id },
          { $set: { "eggsCount": newAmount, "participationCount": newParticipantCount } },
          (updErr, updRes) => { // eslint-disable-line no-unused-vars
            if (updErr === null) {
              callback(new User(findRes.user, newAmount, newParticipantCount));
            } else {
              console.log("UPDATE ERR");
              console.log(updErr);
            }
          });
      }
    });
  }

  insertDelivery(delivery) {
    this.deliveriesCollection.insertOne(delivery);
  }

  getUserByDiscordId(userDiscordId, callback) {
    this.usersCollection.findOne({"discordUser.id": userDiscordId}, {}, (err, res) => {
      if (err !== null) {
        console.log(err);
      }

      callback(res);
    });
  }

  // Dangerous
  cleanDatabase() {
    this.db.dropCollection(usersCollectionName);
    this.db.dropCollection(deliveriesCollectionName);

    // TODO: catch errors (if collection doesn't exist for example) to prevent app from crashing
  }



  // ------------------------------------------------------------------------------------
  // Other helper function
  // ------------------------------------------------------------------------------------

  pickRandomDeliveryType() {
    return deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)];
  }

  /**
   * Simplified version which works with the simple values that are being used in this file. Might
   * not work with any value (because pretty dumb algorithm that does not treat all possible cases
   * deliberately).
   */
  millesecondsToReadableString(time) {
    const timeInSeconds = time / 1000;

    if (timeInSeconds < 60) {

      return `${timeInSeconds} seconds`;

    } else if (timeInSeconds === 60) {

      return "1 minute";

    } else {

      const timeInMinutes = timeInSeconds / 60;
      return `${timeInMinutes} minutes`;

    }
  }



  // ------------------------------------------------------------------------------------
  // Main functions
  // ------------------------------------------------------------------------------------

  postCollectEggsMessage() {
    this.client.channels.fetch(this.channelId)
      .then(channel => {
        // Picking random duration and value in array
        // --------------------------------------------------------------
        const deliveryType = this.pickRandomDeliveryType();


        // Building embed message
        // --------------------------------------------------------------
        let msg = "";

        // Title
        msg += `${delim}title: Easter tacos delivery! `;
        // Color
        msg += `${delim}color: yellow `;
        // Description
        msg += `${delim}desc: React to collect **${deliveryType.value}** easter tacos! Quick, you only have **${this.millesecondsToReadableString(deliveryType.duration)}**!`;
        // Image
        msg += `${delim}img: ${eggEmbedImgUrl}`;

        const embedMsg = embed(msg);


        // Sending embed message and handling reactions when it's sent
        // --------------------------------------------------------------
        channel.send(embedMsg).then(message => {
          // Adding delivery to database for future stats
          this.insertDelivery(new Delivery(deliveryType.duration, deliveryType.value));

          // Setting a delete timeout
          // --------------------------------------------------------------
          message.delete({ timeout: deliveryType.duration });

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
            this.insertOrUpdateUser(user, deliveryType.value, (savedUser) => {
              channel.send(`Yay ${user}! You successfully collected ${deliveryType.value} easter tacos! You now have **${savedUser.eggsCount} easter tacos**.`);
            });
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
  }

  run() {
    this.postCollectEggsMessage();
    // Below code is commented for now, make it easier for testing
    /*
    setInterval(() => {
      this.postCollectEggsMessage();
    }, this.interval);
    */
  }

  // SUPER DUPER DANGEROUS
  // TODO: secure by using existing function for commands
  runCommand(message) {
    if (message.content === "!cleanDb") {
      console.log("clean db");
      this.cleanDatabase();
    }
  }
}






// ================================================================================================
// EXPORTS
// ================================================================================================

module.exports = Easter;