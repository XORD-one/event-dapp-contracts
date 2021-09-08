const {
  deployContract,
  logGas,
  verifyContract,
  delayLog,
  getContractInstance,
} = require("./utils");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const eventsDapp = await getContractInstance(
    "DaoEventsV2",
    "0x4FB4443f1B465270BeCcaaD1af259c6207d63c9e"
  );

  const eventsData = await eventsDapp.events("126");
  console.log("eventsData >>> ", eventsData);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
