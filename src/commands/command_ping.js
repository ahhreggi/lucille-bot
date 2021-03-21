const Command = require("../models/command");
// const { hasRole } = require("../utility");
// const errors = require("./configs/errors");

///////////////////////////////////////////////////////////////////

const name = "ping";
const desc = "checks response time";
const roles = ["user"];
const alias = ["latency"];

// eslint-disable-next-line
const cmdFunction = (message, args) => {
  // DEBUG
  console.log(message.client);
  console.log(message.client.ws);
  console.log(message.client.ws.ping);

  message.channel.send(message.client.ws.ping + "ms");
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);