const Command = require("../models/command");
const { codeBlock } = require("../utility");
const fetchDadJoke = require("./helpers/fetchDadJoke");
const { embed } = require("../embed");

///////////////////////////////////////////////////////////////////

const name = "dadjoke";
const desc = "get a random dad joke";
const roles = ["user"];
const alias = ["joke"];


const cmdFunction = (message) => {

  const delim = "\\";

  fetchDadJoke()
    .then(body => {
      const msg = `${delim}title: Dad joke ${delim}color: yellow ${delim}desc: ${body.joke}`;
      message.channel.send(embed(msg));
    })
    .catch(err => {
      console.log(err);
      message.channel.send("something went wrong D:");
    });

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);
