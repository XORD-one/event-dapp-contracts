const { expect } = require("chai");
const { time } = require("@openzeppelin/test-helpers");
const { toWei, toBN, toTimeFrmCurTime, currentTime } = require("./utils.js");

describe("DaoEventsV2", async () => {
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
      await daoEventsV2.connect(user).createEvent([
        user.address,
        "testing name",
        "topic name",
        "location coordinates",
        "ipfs hash",
        false, // unlimited
        false, // oneTimeBuy
        await toTimeFrmCurTime(24),
        "86400",
        "0",
        "0",
        ["level1", "level2"],
        [toWei("1"), toWei("2")],
      ]);

      expect((await daoEventsV2.eventsOf(user.address)).toString()).to.equal(
        "1"
      );
    });

    it("creates another event", async () => {
      await expect(
        daoEventsV2.connect(accounts[0]).createEvent([
          accounts[0].address,
          "testing name 2",
          "topic name 2",
          "location coordinates",
          "ipfs hash",
          true, // limited
          true, // oneTimeBuy
          await toTimeFrmCurTime(48),
          "86400",
          "100",
          "0",
          ["level1", "level2"],
          [toWei("1"), toWei("2")],
        ])
      ).to.emit(daoEventsV2, "CreatedEvent");

      expect(
        (await daoEventsV2.eventsOf(accounts[0].address)).toString()
      ).to.equal("2");
    });

    it("lets accounts[1] buy ticket of event 1 more than one time", async () => {
      await testToken
        .connect(accounts[1])
        .faucet(accounts[1].address, toWei("10"));
      await testToken
        .connect(accounts[1])
        .approve(daoEventsV2.address, toWei("10"));

      // level1
      const receipt = await daoEventsV2
        .connect(accounts[1])
        .buyTicket("1", "0", "pakistan");
      const tx = await receipt.wait();
      const soldTicketEvent = tx.events[3];
      const timestamp = (
        await soldTicketEvent.getBlock(
          (await await soldTicketEvent.getTransaction(receipt.hash)).toString()
        )
      ).timestamp;

      await expect(receipt)
        .to.emit(daoEventsV2, "SoldTicket")
        .withArgs(
          accounts[1].address,
          "1",
          "1",
          "pakistan",
          toWei("1"),
          timestamp,
          "1",
          "level1"
        );
      expect(await daoEventsV2.ownerOf("1")).to.equal(accounts[1].address);

      // level1
      await daoEventsV2.connect(accounts[1]).buyTicket("1", "0", "pakistan");
      expect(await daoEventsV2.ownerOf("2")).to.equal(accounts[1].address);

      // level2
      await daoEventsV2.connect(accounts[1]).buyTicket("1", "1", "karachi");
      expect(await daoEventsV2.ownerOf("3")).to.equal(accounts[1].address);
    });

    it("lets accounts[2] buy ticket of event 2 only once", async () => {
      await testToken
        .connect(accounts[2])
        .faucet(accounts[2].address, toWei("10"));
      await testToken
        .connect(accounts[2])
        .approve(daoEventsV2.address, toWei("10"));

      // level1
      await daoEventsV2.connect(accounts[2]).buyTicket("2", "0", "pakistan");
      expect(await daoEventsV2.ownerOf("4")).to.equal(accounts[2].address);

      // level1
      await expect(
        daoEventsV2.connect(accounts[2]).buyTicket("2", "0", "pakistan")
      ).to.be.revertedWith("ticket to be bought only one time");

      // level2
      await expect(
        daoEventsV2.connect(accounts[2]).buyTicket("2", "1", "karachi")
      ).to.be.revertedWith("ticket to be bought only one time");
    });

    it("create an event with limited quantity", async () => {
      await daoEventsV2.connect(user).createEvent([
        user.address,
        "testing name 2",
        "topic name 2",
        "location coordinates",
        "ipfs hash",
        true, // limited
        false, // oneTimeBuy
        await toTimeFrmCurTime(48),
        "86400",
        "2",
        "0",
        ["level1", "level2"],
        [toWei("1"), toWei("2")],
      ]);

      expect((await daoEventsV2.eventsOf(user.address)).toString()).to.equal(
        "1,3"
      );
      expect((await daoEventsV2.events("3")).totalQuantity).to.equal("2");

      await testToken
        .connect(accounts[2])
        .faucet(accounts[2].address, toWei("10"));
      await testToken
        .connect(accounts[2])
        .approve(daoEventsV2.address, toWei("10"));

      // level1
      await daoEventsV2.connect(accounts[2]).buyTicket("3", "0", "pakistan");
      expect(await daoEventsV2.ownerOf("5")).to.equal(accounts[2].address);
      expect((await daoEventsV2.events("3")).quantitySold).to.equal("1");

      // level2
      await daoEventsV2.connect(accounts[2]).buyTicket("3", "1", "karachi");
      expect(await daoEventsV2.ownerOf("6")).to.equal(accounts[2].address);
      expect((await daoEventsV2.events("3")).quantitySold).to.equal("2");

      // should fail
      expect(
        daoEventsV2.connect(accounts[2]).buyTicket("3", "0", "pakistan")
      ).to.be.revertedWith("ticket quantity exceeded");
    });
  });
});
