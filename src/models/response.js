class Response {

  // data = message/response content
  // action = "send" or "return"
  // key = if action = "send", key is ignored and data is posted to the channel
  //       if action = "return", the key value is used to determine what bot.js will do
  constructor(data, action, key = null) {

    this.data = data;
    this.action = action;
    this.key = key;

    if (this.action !== "return") {
      this.key = null;
    }

  }

}

module.exports = Response;