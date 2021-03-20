const Command = require("../command");

///////////////////////////////////////////////////////////////////

const name = "pretendegrees";
const desc = "convert pretendegrees (°F) into real degrees (°C)";
const roles = ["user"];
const alias = [];

const cmdFunction = (message, args) => {

  const sender = message.member;
  // Convert message content into a float
  const fahrenheit = parseFloat(args[0]);
  // Check if fahrenheit value is a number, otherwise ask for a real number
  if (!isNaN(fahrenheit)) {
    const celsius = (fahrenheit - 32) * (5 / 9);
    message.channel.send(`${sender} ${fahrenheit} pretendegrees (°F) is ${celsius.toFixed(1)}°C`);
  } else {
    message.channel.send("enter a real number bro");
  }

};

//////////////////////////////////////////////////////////////////

module.exports = new Command(name, desc, roles, alias, cmdFunction);