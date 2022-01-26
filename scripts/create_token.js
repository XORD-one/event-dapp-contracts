// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer]= await ethers.getSigners();
  // console.log(deployer)
  //calculate deployer balanceOf
  const deployerBalance = await ethers.provider.getBalance(deployer.address);
  // console.log("Deployer balance: ", deployerBalance.toString());
  console.log(deployer.address + ' : ' + ethers.utils.formatEther(deployerBalance));

  //deploy Oracle
  //MATIC CONFGI BELOW ---------------------------------------------------------------------------------------------
  // const Oracle = await ethers.getContractFactory("Oracle");
  // const oracle = await Oracle.deploy();
  // console.log("Oracle address: ", oracle.address);
  // let oracleAddress = `${oracle.address}`;
  let oracleAddress = "0xBBdA3c79f4d5AA54bD2E2739549BFA84102274D6";

  const DaoEvents = await ethers.getContractFactory("DaoEventsV2");
  const daoEventsV2 = await DaoEvents.deploy("0x92C59F1cC9A322670CCa29594e4D994d48BDFd36", oracleAddress);
  await daoEventsV2.deployed();
  console.log("Dao events deployed to ", daoEventsV2.address);
  
  //ETHEREUM CONFGI BELOW ------------------------------------------------------------------------------------------

  // const DaoEvents = await ethers.getContractFactory("DaoEventsV2");
  // const daoEventsV2 = await DaoEvents.deploy("0x521855AA99a80Cb467A12b1881f05CF9440c7023","0xEdF851bc9a7c58CB00CF4Ce11B9167fcA8feb99a");
  // await daoEventsV2.deployed();

  // console.log("Dao events deployed to ", daoEventsV2.address);

  // const DaoEvents = await ethers.getContractFactory("DaoEventsV2");
  // const daoEventsV2 = await upgrades.deployProxy(DaoEvents,["0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]);
  // await daoEventsV2.deployed();
  // console.log("daoEventsV2-upgradeable deployed Address:", daoEventsV2.address);

  // const proxyAddress = '0xb819adb6d585dc321a9bc055faa6303b8d3cf186';
  // const PolkalokrToken = await ethers.getContractFactory("PolkalokrToken");
  // const PolkalokrTokenAddress = await upgrades.prepareUpgrade (proxyAddress,PolkalokrToken);
  // console.log("PolkalokrToken upgrade address :",PolkalokrTokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
