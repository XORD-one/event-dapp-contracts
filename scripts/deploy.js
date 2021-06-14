const fs = require("fs");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Oracle = await ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();
  // console.log(oracle);
  console.log(`Oracle address: ${oracle.address}`);
  // https://rinkeby.etherscan.io/address/0x570c60deb26Ec72F74f2c917f767070F0b27f674#code

  /*
  const TestToken = await ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy();
  // console.log(testToken);
  console.log(`TestToken address: ${testToken.address}`);
  */

  const DaoEventsV2 = await ethers.getContractFactory("DaoEventsV2");
  const daoEventsV2 = await DaoEventsV2.deploy(
    "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A", // phnx
    oracle.address
  );
  // console.log(daoEventsV2);
  console.log(`DaoEventsV2 address: ${daoEventsV2.address}`);
  // https://rinkeby.etherscan.io/address/0x20F9bD13a6B173D1925c4D79529bb5930F9F155D#code
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
