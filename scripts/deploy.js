const fs = require("fs");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // const Oracle = await ethers.getContractFactory("Oracle");
  // const oracle = await Oracle.deploy();
  // // console.log(oracle);
  // console.log(`Oracle address: ${oracle.address}`);

  // "0x6b1f007951d77dfe220b2ad010c8f5cd27231158", // goerli phnx
  // "0xd68c6345f969603500f14A648Ad35d02B45729c7" // goerli oracle

  const DaoEventsV2 = await ethers.getContractFactory("DaoEventsV2");
  const daoEventsV2 = await DaoEventsV2.deploy(
    "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A", // rinkeby phnx
    "0x570c60deb26Ec72F74f2c917f767070F0b27f674" // rinkeby oracle
  );
  // console.log(daoEventsV2);
  console.log(`DaoEventsV2 address: ${daoEventsV2.address}`);

  // oracle ->
  // daoeventsv2 ->
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
