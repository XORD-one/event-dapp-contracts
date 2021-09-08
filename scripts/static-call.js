const {
  deployContract,
  logGas,
  verifyContract,
  delayLog,
  getContractInstance,
} = require("./utils");

async function main() {
  let tx;
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const oracle = await getContractInstance(
    "Oracle",
    "0xb8B47C2F67f23616AE61ce174d9AE59E6649EfF7"
  );

  // console.log("oracle >>> ", oracle);

  const fetchedPrice = await oracle.callStatic.fetch(
    "0x0cEbA92298b655C827D224D33461B4A1F9C418a6" // usdt
  );
  console.log("fetchedPrice >>> ", fetchedPrice);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
