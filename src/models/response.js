class Response {

  constructor(content, key) {

    this.content = content; // a string of data to return
    this.key = key; // the value used to determine what bot.js should do

  }

}

module.exports = Response;