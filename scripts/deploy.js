const fs = require("fs");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  /*
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();
  // console.log(oracle);
  console.log(`Oracle address: ${oracle.address}`);
  */

  const DaoEventsV2 = await ethers.getContractFactory("DaoEventsV2");
  const daoEventsV2 = await DaoEventsV2.deploy(
    "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A", // phnx
    "0x570c60deb26Ec72F74f2c917f767070F0b27f674"
  );
  // console.log(daoEventsV2);
  console.log(`DaoEventsV2 address: ${daoEventsV2.address}`);

  // oracle -> https://rinkeby.etherscan.io/address/0x570c60deb26Ec72F74f2c917f767070F0b27f674#code
  // daoeventsv2 -> https://rinkeby.etherscan.io/address/0xD0A4e6A86467F8a12C50E4e3eAA7e2afa6b7E77e#code
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
