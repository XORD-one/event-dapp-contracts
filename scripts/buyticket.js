const { expect } = require("chai");
const { toTimeFrmCurTime } = require("../test/utils");
const { toWei, fromWei } = require("./utils");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer, user] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  console.log(`Deployer balance: ${(await deployer.getBalance()).toString()}`);
  console.log(`User balance: ${(await user.getBalance()).toString()}`);

  const PHNX = "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A";
  const ORACLE = "0x570c60deb26Ec72F74f2c917f767070F0b27f674";
  const DAO_EVENTS_V2 = "0x9782720DB61f0a1b63EC1b6557273aedD5D73393";

  const phnx = await ethers.getContractAt("PhoenixDAO", PHNX);
  const daoeventsv2 = await ethers.getContractAt("DaoEventsV2", DAO_EVENTS_V2);
  const oracle = await ethers.getContractAt("Oracle", ORACLE);

  console.log(
    `${deployer.address} has ${fromWei(
      await phnx.balanceOf(deployer.address)
    )} PHNX`
  );
  console.log(
    `${user.address} has ${fromWei(await phnx.balanceOf(user.address))} PHNX`
  );

  // create event1
  await daoeventsv2.connect(deployer).createEvent([
    false, // oneTimeBuy
    deployer.address,
    await toTimeFrmCurTime(24),
    "86400",
    "0",
    "0",
    "testing name",
    "topic name",
    "location coordinates",
    "ipfs hash",
    [false, false], // unlimited
    ["0", "0"], // unlimited
    [toWei("1"), toWei("2")],
    ["0", "0"],
    ["level1", "level2"],
  ]);

  // create event2
  await daoeventsv2.connect(deployer).createEvent([
    true, // oneTimeBuy
    deployer.address,
    await toTimeFrmCurTime(48),
    "86400",
    "60",
    "0",
    "testing name 2",
    "topic name ",
    "location coordinates 2",
    "ipfs hash 2",
    [true, true], // limited
    ["50", "10"], // limited
    [toWei("1"), toWei("2")],
    ["0", "0"],
    ["level1", "level2"],
  ]);

  // approve all phnx tokens to daoeventsv2 contract
  await phnx
    .connect(user)
    .approve(daoeventsv2.address, ethers.constants.MaxUint256);

  // buy ticket from event1
  await daoeventsv2.connect(user).buyTicket(["1", "0", "xord1"]);
  await daoeventsv2.connect(user).buyTicket(["1", "1", "xord2"]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
