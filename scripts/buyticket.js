const { expect } = require("chai");
const { toWei } = require("./utils");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer, user] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const PHNX = "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A";
  const ORACLE = "0x570c60deb26Ec72F74f2c917f767070F0b27f674";
  const DAO_EVENTS_V2 = "0x8D23d14c98D0a95AE245b3f51ffc6E8B0A5A8686";

  const phnx = await ethers.getContractAt("PhoenixDAO", PHNX);
  const daoeventsv2 = await ethers.getContractAt("DaoEventsV2", DAO_EVENTS_V2);
  const oracle = await ethers.getContractAt("Oracle", ORACLE);

  // create event1
  await daoeventsv2
    .connect(deployer)
    .createEvent([
      true,
      false,
      deployer.address,
      "1623833728",
      "172800",
      "5",
      "0",
      "testing event 1",
      "topic event 1",
      "location coordinates",
      "ipfs hash",
      ["level1", "level2"],
      ["10000000000000000000", "20000000000000000000"],
    ]);

  // create event2
  await daoeventsv2
    .connect(deployer)
    .createEvent([
      false,
      false,
      deployer.address,
      "1623833728",
      "172800",
      "5",
      "0",
      "testing event 2",
      "topic event 2",
      "location coordinates",
      "ipfs hash",
      ["level1", "level2"],
      ["20000000000000000000", "40000000000000000000"],
    ]);

  // approve all phnx tokens to daoeventsv2 contract
  await phnx
    .connect(user)
    .approve(daoeventsv2.address, ethers.constants.MaxUint256);

  // buy ticket from event1
  await daoeventsv2.connect(user).buyTicket("1", "0", "xord");

  expect(await phnx.balanceOf(daoeventsv2.address)).to.equal(toWei("1"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
