const Discord = require("discord.js");

/**
 * Custom embed syntax string parser
 *
 * Either use a simple message or construct using the following options:
 *
 * \color: red
 * \title: Sample Embed
 * \url: google.ca
 * \author: Lucille
 * \desc: This is the description.
 * \thumbnail: https://i.imgur.com/pbrZNDp.jpg
 * \img: https://i.imgur.com/pbrZNDp.jpg
 * \footer: This is the footer.
 * \footerimg: https://i.imgur.com/pbrZNDp.jpg
 * \add: space
 * \add: timestamp
 * \Some Field Title: Some text.
 *
 * Example (simple): "This is a message."
 * Example (construct): "\color: red \title: Google \url: https://google.ca \desc: Google is your friend."
 *
 * @param  {string} string
 *         Non-empty embedd string in the syntax specified above.
 * @param  {string} delim
 *         Optional delimiter to use instead of "\".
 * @param  {boolean} forceSimple
 *         When set to true, this will always return the string as a simple message embed.
 * @param  {string|null} color
 *         An optional color to use. Overrides all other formatting.
 * @return {Discord.MessageEmbed|boolean}
 *         Embed object that can be sent to a channel as an embedded message or false
 *         if string is invalid.
 */
const embed = (string, delim = "\\", forceSimple = false, color = null) => {

  const innerDelim = ":";
  const space = "\u200B";

  // ERROR: String may not be empty
  if (!string) return false;

  let embedMsg = new Discord.MessageEmbed();

  // If a simple message is given => embed the entire string as a description
  if (!string.startsWith(delim) || forceSimple) {
    console.log("check2", color);
    embedMsg = embedMsg.setDescription(string);
    // If a color is provided for a simple message, set color
    embedMsg = color ? embedMsg.setColor(color.toUpperCase()) : embedMsg;
    return embedMsg;
  }

  // If a message starts with the delim => construct embed using options

  // Parse args to isolate options
  let argOpts = string.split(delim).slice(1); // .slice(1) to remove '' at index 0

  let valid = 0;
  let footer = "";
  let footerimg;

  // Parse options to isolate property and value
  for (const opt of argOpts) {

    const opts = opt.replace(innerDelim, "%~/$!%").split("%~/$!%");

    // If the option is a single string, syntax is invalid
    if (opts.length === 1) return false;

    // If the option is a property-value pair...
    if (opts.length === 2) {

      // Isolate the property and value
      const property = opts[0].trim();
      const value = opts[1].trim();

      // VALID PROPERTIES:

      // spacer
      if (property.toLowerCase() === "add" && value.toLowerCase() === "space") {
        embedMsg = embedMsg.addField(space, space);

        // timestamp
      } else if (property.toLowerCase() === "add" && value.toLowerCase() === "timestamp") {
        embedMsg = embedMsg.setTimestamp();

        // color
      } else if (property.toLowerCase() === "color" && value) {
        embedMsg = embedMsg.setColor(value.toUpperCase());

        // title
      } else if (property.toLowerCase() === "title" && value) {
        embedMsg = embedMsg.setTitle(value);
        valid++;

        // desc
      } else if (property.toLowerCase() === "desc" && value) {
        embedMsg = embedMsg.setDescription(value);
        valid++;

        // url (requires title)
      } else if (property.toLowerCase() === "url" && value) {
        embedMsg = embedMsg.setURL(value);

        // author
      } else if (property.toLowerCase() === "author" && value) {
        embedMsg = embedMsg.setAuthor(value);
        valid++;

        // thumbnail
      } else if (property.toLowerCase() === "thumbnail" && value) {
        embedMsg = embedMsg.setThumbnail(value);
        valid++;

        // footer
      } else if (property.toLowerCase() === "footer" && value) {
        footer = value;

        // footer image (requires footer)
      } else if (property.toLowerCase() === "footerimg" && value) {
        footerimg = value;

        // image
      } else if (["image", "img"].includes(property.toLowerCase()) && value) {
        embedMsg = embedMsg.setImage(value);
        valid++;

        // If the property is none of the above, use the opts as the name and value of a field instead
        // "The field title: The field description"
      } else if (property && value) {
        embedMsg = embedMsg.addField(property, value);
        valid++;
      }

    }

    // Check that a footerimg is provided if a footer is set
    if (footer && !footerimg) {
      embedMsg = embedMsg.setFooter(footer);
      valid++;
    } else if (footer && footerimg) {
      embedMsg = embedMsg.setFooter(footer, footerimg);
      valid++;
    } else if (!footer && footerimg) {
      return false;
    }

    // If a color is provided, set color
    embedMsg = color ? embedMsg.setColor(color.toUpperCase()) : embedMsg;

  }

  // The embed is sent only if at least one valid option was set
  return valid ? embedMsg : false;

};

/**
 * Returns a help message for constructing a custom embed string.
 * @param  {string} delim
 *         Optional delimiter to use instead of "\".
 * @return {string}
 *         A help message.
 */
const embedHelp = (delim = "\\") => {

  let usage = "\n\nEither use a simple message or construct using the following options:";
  usage += `\n\n${delim}color: red`;
  usage += `\n${delim}title: Sample Embed`;
  usage += `\n${delim}url: google.ca`;
  usage += `\n${delim}author: Lucille`;
  usage += `\n${delim}desc: This is the description.`;
  usage += `\n${delim}thumbnail: https://i.imgur.com/pbrZNDp.jpg`;
  usage += `\n${delim}img: https://i.imgur.com/pbrZNDp.jpg`;
  usage += `\n${delim}footer: This is the footer.`;
  usage += `\n${delim}footerimg: https://i.imgur.com/pbrZNDp.jpg`;
  usage += `\n${delim}add: space`;
  usage += `\n${delim}add: timestamp`;
  usage += `\n${delim}Some Field Title: Some text.`;
  usage += "\n\nExample: This is a message.";
  usage += `\nExample: ${delim}color: red ${delim}title: Google ${delim}url: https://google.ca ${delim}desc: Google is your friend.`;

  return usage;
};

module.exports = { embed, embedHelp };