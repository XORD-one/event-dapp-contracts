const { deployContract, logGas, verifyContract } = require("./utils");

async function main() {
  let tx;
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const args = [
    "0x521855AA99a80Cb467A12b1881f05CF9440c7023", // rinkeby new phnx
    "0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc", // rinkeby new oracle
  ];
  const daoEventsV2 = await deployContract(deployer, "DaoEventsV2", args);
  console.log(`DaoEventsV2 address: ${daoEventsV2.address}`);
  tx = daoEventsV2.deployTransaction;
  await logGas(tx);
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(daoEventsV2.address, args, tx, { ms: 120000 });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// "0x6b1f007951d77dfe220b2ad010c8f5cd27231158", // goerli phnx
// "" // goerli oracle

// "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A", // rinkeby phnx
// "" // rinkeby oracle
