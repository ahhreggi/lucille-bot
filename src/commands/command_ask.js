const Command = require("../command");
const askResponses = require("./configs/askResponses");

///////////////////////////////////////////////////////////////////

const name = "ask";
const desc = "ask a question and lucille will answer... maybe";
const roles = ["user"];
const alias = ["heylucille"];

const cmdFunction = (message) => {

  // TODO: Implement global cooldown
  // if (!askReady) return;
  // askReady = false;

  const thinking = askResponses.thinking[Math.floor(Math.random() * askResponses.thinking.length)];
  const answer = askResponses.answer[Math.floor(Math.random() * askResponses.answer.length)];

  message.channel.send(thinking);

  setTimeout(() => {
    message.channel.send(`${message.member} ${answer}`);
    askReady = true;
  }, 3000); // 3 sec delay to *think*

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, cmdFunction, roles, alias);