/**
 * Scripts for doing dev things~
 *
 * USAGE:
 *
 * node pls addcmd <commandname> <description>
 *   - Creates a blank command file template in the commands directory.
 *   - Key aliases: addcommand, add
 */

const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const templatePath = "./src/commands/templates/template_blank.js";
const commandsDirectory = "./src/commands/";

let KEY;
let CMD;
let DESC;

const errorMsg = "Usage: node pls addcmd <commandname> <description (optional)>";

try {
  KEY = process.argv[2].toLowerCase();
  CMD = process.argv[3].toLowerCase();
  DESC = process.argv.slice(4).join(" ");
} catch (err) {
  return console.log(errorMsg);
}

if (["add", "addcmd", "addcommand"].includes(KEY)) {

  if (!CMD) return;

  const filename = `command_${CMD}.js`;

  const createCommandFile = () => {
    readFile(templatePath, "utf8")
      .then((data => {
        const template = data
          .replace("const name = \"\";", `const name = "${CMD}";`)
          .replace("const desc = \"\";", `const desc = "${DESC}";`)
          .replace(" // eslint-disable-line", "");
        return template;
      }))
      .then(data => writeFile(commandsDirectory + filename, data))
      .then(() => console.log(`✔️  Successfully created file: ${filename}`))
      .catch((e) => {
        console.log(`❌ Failed to create file: ${filename} --- there was a path error!`);
        console.log(e);
      });
  };

  readFile(commandsDirectory + filename)
    .then(data => {
      if (data) {
        console.log(`❌ Failed to create file: ${filename} --- command file already exists!`);
      }
    })
    .catch(() => {
      createCommandFile();
    });
  return;

}

console.log("uhhhh we don't have a script for that yet xd");