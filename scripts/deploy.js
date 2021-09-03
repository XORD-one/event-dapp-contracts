const { deployContract, logGas, verifyContract, delayLog } = require("./utils");

async function main() {
  let tx;
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // const oracle = await deployContract(deployer, "Oracle");
  // console.log(`Oracle address: ${oracle.address}`);
  // tx = oracle.deployTransaction;
  // await logGas(tx);
  // if (chainId != 31337 && chainId != 1337) {
  //   await verifyContract(oracle.address, [], tx, { ms: 120000 });
  // }

  // await delayLog(60000);

  const args = [
    "0x521855AA99a80Cb467A12b1881f05CF9440c7023", // rinkeby new phnx
    "0xB89bBa46118E7Ac201A5A83AE0ab71f790Fe3B3F", // rinkeby new oracle
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
// "0xd68c6345f969603500f14A648Ad35d02B45729c7" // goerli oracle

// "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A", // rinkeby phnx
// "0x570c60deb26Ec72F74f2c917f767070F0b27f674" // rinkeby oracle
