const { deployContract, logGas, verifyContract, delayLog } = require("./utils");

async function main() {
  let tx;
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const oracle = await deployContract(deployer, "Oracle");
  console.log(`Oracle address: ${oracle.address}`);
  tx = oracle.deployTransaction;
  await logGas(tx);
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(oracle.address, [], tx, { ms: 120000 });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
