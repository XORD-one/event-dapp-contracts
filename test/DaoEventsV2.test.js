const { expect } = require("chai");
const { toWei, toBN } = require("./utils.js");

describe("DaoEventsV2", () => {
  let daoEventsV2, testToken;

  before(async () => {
    [owner, user, ...accounts] = await ethers.getSigners();

    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy();

    const DaoEventsV2 = await ethers.getContractFactory("DaoEventsV2");
    daoEventsV2 = await DaoEventsV2.deploy(testToken.address);
  });

  describe("DaoEventsV2 Deployment", async () => {
    it("has a name", async () => {
      const name = await daoEventsV2.name();
      expect(name).to.equal("PhoenixDAO Ticket");
    });

    it("has a symbol", async () => {
      const symbol = await daoEventsV2.symbol();
      expect(symbol).to.equal("DDD");
    });

    it("creates an event", async () => {
      await daoEventsV2
        .connect(user)
        .createEvent([
          user.address,
          "testing name",
          "topic name",
          "location coordinates",
          "ipfs hash",
          "false",
          "1623239890",
          "86400",
          "100",
          "0",
          ["level1", "level2"],
          ["1000000000000000000", "2000000000000000000"],
        ]);

      expect((await daoEventsV2.eventsOf(user.address)).toString()).to.equal(
        "1"
      );
    });

    it("creates another event", async () => {
      await daoEventsV2
        .connect(accounts[0])
        .createEvent([
          accounts[0].address,
          "testing name 2",
          "topic name 2",
          "location coordinates",
          "ipfs hash",
          "false",
          "1623239890",
          "86400",
          "100",
          "0",
          ["level1", "level2"],
          ["1000000000000000000", "2000000000000000000"],
        ]);

      expect(
        (await daoEventsV2.eventsOf(accounts[0].address)).toString()
      ).to.equal("2");
    });
  });
});
