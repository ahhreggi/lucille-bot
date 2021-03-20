const Command = require("../command");
const { codeBlock } = require("../utility");
const fetchDadJoke = require("./helpers/fetchDadJoke");

///////////////////////////////////////////////////////////////////

const name = "dadjoke";
const desc = "get a random dad joke";
const roles = ["user"];
const alias = ["joke"];

const cmdFunction = (message) => {

  fetchDadJoke()
    .then(body => message.channel.send(codeBlock(body.joke)))
    .catch(err => {
      console.log(err);
      message.channel.send("something went wrong D:");
    });

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);