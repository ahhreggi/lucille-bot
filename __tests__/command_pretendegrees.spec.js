const pretendegrees = require("../src/commands/command_pretendegrees");

describe("command pretendegrees", () => {
  const message = {
    channel: {
      send: jest.fn() // eslint-disable-line no-undef
    }
  };

  it("should send message for invalid number when given a string", () => {
    const cmdFunction = pretendegrees.getFunc();
    cmdFunction(message, "not a number");

    // eslint-disable-next-line no-undef
    expect(message.channel.send).toHaveBeenCalledWith("enter a real number bro");
  });
});