/**
 * Prompt data.
 *
 * Prompt format:
 * {
 *   key: {
 *     caseSensitive: {true|false},   // Whether or not the trigger messages are case sensitive.
 *                                    // If not specified, case insensitive.
 *     rule: {"exact"|"includes"},    // Whether the message must include one of the trigger or be exactly equals to it.
 *                                    // If none is specified (or invalid value), exact comparison will be used.
 *     triggers: [],                  // String array of trigger messages
 *     responses: []                  // String array of response messages
 *   }
 * }
 */

module.exports = {
  goodmorning: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "good morning lucille",
      "morning lucille",
    ],
    responses: [
      "good morning %MEMBER%! :)",
      "~*yawn*~ morning!",
      "g'day mate",
      "good morning! :)",
      "GOOOOOOOOOOOOOOD morning!",
      "morning :D",
      "<:ahhGM:730258615268540537>"
    ]
  },
  goodafternoon: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "good afternoon"
    ],
    responses: [
      "good ***morning*** >:("
    ]
  },
  nou: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "no u"
    ],
    responses: [
      "no u %MEMBER%"
    ]
  },
  shutup: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "shut up lucille"
    ],
    responses: [
      "no u",
      "ok :<",
      "wtf did u just say to me u little burrito",
      "wow ok i see u"
    ]
  },
  wakeup: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "wake up",
      "wake up lucille"
    ],
    responses: [
      "I'M AWAKE D:"
    ]
  },
  bye: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "bye"
    ],
    responses: [
      "later nerd",
      "cya l8r allig8r",
      "byeee",
      "okay bye :("
    ]
  },
  heightReggi: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "what's Reggi's height, lucille",
      "what's Reggi's height lucille",
      "how tall is Reggi lucille",
      "how tall is Reggi, lucille"
    ],
    responses: [
      "taller than you bro",
      "Reggi is <:ahh61:469753673795371018>",
      "i don't know but she's definitely not 5'2\""
    ]
  },
  thanks: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "thanks lucille"
    ],
    responses: [
      "np"
    ]
  },
  iwin: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "i win"
    ],
    responses: [
      "no u don't lol"
    ]
  },
  goodnight: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "good night lucille"
    ],
    responses: [
      "good night %MEMBER% :)",
      "sweet dreams %MEMBER% :)",
      "good night don't forget me pls ty :>",
      "good night! :D",
      "night!"
    ]
  },
  pog: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "<:ahhpog:797912934549422110>"
    ],
    responses: [
      "<:ahhpog:797912934549422110>"
    ]
  },
  boogie: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "<:boogie:701313374733991998>"
    ],
    responses: [
      "<:boogie:701313374733991998>"
    ]
  },
  lucille: {
    caseSensitive: true,
    rule: "exact",
    triggers: [
      "LUCILLE"
    ],
    responses: [
      "WHAT"
    ]
  },
  heylucille: {
    caseSensitive: false,
    rule: "includes",
    triggers: [
      "hey lucille,"
    ],
    responses: [
      "!ask:hey lucille,"
    ],
  },
  sec: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "sec"
    ],
    responses: [
      "mouillé"
    ]
  },
  niceDay: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "have a nice day lucille",
      "have a nice day, lucille",
      "have a great day lucille",
      "have a great day, lucille"
    ],
    responses: [
      "you too %MEMBER% :)",
      "have an awesome day %MEMBER%!",
      "thank you, have a great day too %MEMBER% :D"
    ]
  },
  lunch: {
    caseSensitive: false,
    rule: "exact",
    triggers: [
      "what's for lunch, lucille?",
      "what are we having for lunch, lucille?"
    ],
    responses: [
      "~*munch munch*~, sorry you were saying?",
      "SUSHIIIIIIIIIIIIIIIIIII!",
      "tacos ofc",
      "mcdonald's but shh... don't tell chchmom",
      "TACOS TIME!"
    ]
  }
};