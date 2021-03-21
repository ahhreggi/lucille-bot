const Command = require("../models/command");
const { codeBlock } = require("../utility");

///////////////////////////////////////////////////////////////////

const name = "ping";
const desc = "checks response time";
const roles = ["user"];
const alias = ["latency"];

const cmdFunction = (message) => {
  message.channel.send("Calculating...").then(async(msg) => {
    msg.delete();

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const apiLatency = message.client.ws.ping;

    let strResult = "RESPONSE TIME\n\n";
    strResult += "Latency: " + latency + "ms\n";
    strResult += "API latency: " + apiLatency + "ms";

    message.channel.send(codeBlock(strResult));
  });
};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);