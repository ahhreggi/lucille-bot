/*
 * DISCLAIMER: the functions in this file do not respect the single responsibility principle.
 */

// ================================================================================================
// IMPORTS
// ================================================================================================

const Discord = require("discord.js");
const { default: axios } = require("axios");
const fs = require("fs");
const fetch = require("node-fetch");



// ================================================================================================
// GLOBAL VARIABLES
// ================================================================================================

// ---------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------
const API_BASE_URL = "https://www.tiktok.com/oembed";

const HTTP_SUCCESS_CODE = 200;
const TIKTOK_ERROR_MSG = "Something went wrong";

const WEB_LINK_PREFIX = "https://www.";
const MOBILE_LINK_PREFIX = "https://";

const TIKTOK_WEB_LINK_PATTERN = "tiktok.com/@";
const TIKTOK_MOBILE_LINK_PATTERN = "vm.tiktok.com/";

const TMP_IMG_DIR = "./tmp/";
const IMG_EXT = ".png";


// ---------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------
// Disclaimer: Quick solution. Not very clean to have those two booleans as global variables.
//             Should instead pass them as params of the function that modifies them (and maybe
//             even encapsulate them in a class with the link)
let isWebLink = false;
let isMobileLink = false;



// ================================================================================================
// HELPERS
// ================================================================================================

/**
 * Extracts and returns the first TikTok video link found in a string if there is one, null otherwise.
 * Warning: this function modifies the following global variables: isWebLink and isMobileLink.
 *
 * @param {string} message A string message.
 * @returns The first TikTok video link if there is one, null otherwise.
 */
const extractTiktokLink = (message) => {
  // Search the position of the first occurrence of a TikTok link
  let pos = message.search(TIKTOK_WEB_LINK_PATTERN);
  if (pos !== -1) {
    isWebLink = true;
  } else {
    pos = message.search(TIKTOK_MOBILE_LINK_PATTERN);
    if (pos === -1) {
      return null;
    } else {
      isMobileLink = true;
    }
  }

  // Extract the link (ignoring the prefix)
  const shortLink = message.slice(pos).split(" ")[0];

  // Prepare prefix to append
  let prefix = WEB_LINK_PREFIX;
  if (isMobileLink) {
    prefix = MOBILE_LINK_PREFIX;
  }

  return `${prefix}${shortLink}`;
};


/**
 * Requests the TikTok embed API and sends an embed with the following data: video title, video url, author name, author url,
 * video thumbnail, username of the Discord user who shared the video.
 *
 * @param {Discord.Channel} channel Discord channel in which the message was sent.
 * @param {string} linkToRequest The video URL that will be used to request the TikTok API.
 * @param {string} linkToDisplay The video URL that will be linked in the embed (basically the same as the link to request for a web link).
 * @param {string} authorUsername The username of the Discord user that sent the message.
 */
const printTiktokLinkInfo = (channel, linkToRequest, linkToDisplay, authorUsername) => {
  // Request TikTok API with the linkToRequest as param
  axios.get(API_BASE_URL, {
    params: {
      url: linkToRequest
    }
  })
    .then((response) => {
      // If request failed, exit
      if (response.status !== HTTP_SUCCESS_CODE
        || (response.status === HTTP_SUCCESS_CODE && response.data && response.data.status_msg && response.data.status_msg === TIKTOK_ERROR_MSG)) {
        console.error("Something went wrong");
        return;
      }

      // Downloading image
      fetch(response.data.thumbnail_url)
        .then(res => {
          // TODO: use an unique name (UUID or hash of the title?)
          const tmpImgPath = `${TMP_IMG_DIR}tiktok-thumbnail-preview${IMG_EXT}`;

          const dest = fs.createWriteStream(tmpImgPath);
          const stream = res.body.pipe(dest);

          stream.on("finish", () => {
            // Embed
            // TODO: use embed function defined in embed.js
            const embed = new Discord.MessageEmbed()
              .setTitle(response.data.title)
              .setURL(linkToDisplay)
              .setAuthor(response.data.author_name, "", response.data.author_url)
              .attachFiles([tmpImgPath])
              .setImage("attachment://tiktok-thumbnail-preview.png")
              .setFooter(`shared by ${authorUsername}`);

            channel.send(embed);
          });

        });


    })
    .catch((error) => {
      console.error(error);
    });
};



// ================================================================================================
// MAIN FUNCTION (EXPORTED)
// ================================================================================================

/**
 * Checks if the message contains a TikTok link and if so, sends a preview in a embed ( @see printTiktokLinkInfo() ).
 *
 * @param {Discord.Message} message Discord message that was sent.
 */
const listenForTiktokLink = (message) => {
  // Reset global variables
  isWebLink = false;
  isMobileLink = false;

  // Extract TikTok video link
  const tiktokLink = extractTiktokLink(message.content);

  // If a TikTok video link was found
  if (tiktokLink) {
    // Web link
    if (isWebLink) {
      printTiktokLinkInfo(message.channel, tiktokLink, tiktokLink, message.author.username);
    // Mobile link
    } else if (isMobileLink) {
      // We cannot directly request the API with a mobile link, we need another link first
      // (using the URL found at resp.request.res.responseUrl which has not be much tested)
      axios.get(tiktokLink)
        .then((resp) => {
          const urlToRequest = resp.request.res.responseUrl;
          printTiktokLinkInfo(message.channel, urlToRequest, tiktokLink, message.author.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};



// ================================================================================================
// EXPORTS
// ================================================================================================

module.exports = {
  listenForTiktokLink
};
