const Command = require("../models/command");
const Response = require("../models/response");
const askResponses = require("./configs/askResponses");

///////////////////////////////////////////////////////////////////

const name = "ask";
const desc = "ask a question and lucille will answer... maybe";
const roles = ["user"];
const alias = ["heylucille"];

const cmdFunction = (message, args, data) => {

  const { cmdVars } = data;

  if (!cmdVars.askReady) return;

  if (!args.length) {
    return message.channel.send("you're supposed to ask a question helo???");
  }

  const thinking = askResponses.thinking[Math.floor(Math.random() * askResponses.thinking.length)];
  const answer = askResponses.answer[Math.floor(Math.random() * askResponses.answer.length)];

  message.channel.send(thinking);

  const content = `${message.member} ${answer}`;
  const key = "askDelay";

  return new Response(content, key);

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);