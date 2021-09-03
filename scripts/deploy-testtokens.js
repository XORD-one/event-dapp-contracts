const {
  etherBalanceString,
  deployContract,
  toWei,
  logGas,
  verifyContract,
  delayLog,
} = require("./utils.js");

async function main() {
  let tx;
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const phnxTestnet = await deployContract(deployer, "PhnxTestnet");
  console.log(`PhnxTestnet address: ${phnxTestnet.address}`);
  tx = phnxTestnet.deployTransaction;
  await logGas(tx);
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(phnxTestnet.address, [], tx);
  }

  const usdtTestnet = await deployContract(deployer, "UsdtTestnet");
  console.log(`UsdtTestnet address: ${usdtTestnet.address}`);
  tx = usdtTestnet.deployTransaction;
  await logGas(tx);
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(usdtTestnet.address, [], tx);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
