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
  const latency = Date.now() - message.createdTimestamp;
  const apiLatency = message.client.ws.ping;

  // debug
  console.log(latency);
  console.log(apiLatency);

  let strResult = "RESPONSE TIME\n\n";
  strResult += "Latency:" + latency + "ms\n";
  strResult += "API latency:" + apiLatency + "ms";

  message.channel.send(strResult);
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);