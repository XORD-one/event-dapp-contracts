// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {

  // const DaoEvents = await ethers.getContractFactory("DaoEventsV2");
  // const daoEventsV2 = await DaoEvents.deploy("0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc");
  // await daoEventsV2.deployed();
  // console.log("Dao events deployed to ", daoEventsV2.address);
  
  const DaoEvents = await ethers.getContractFactory("DaoEventsV2");
  const daoEventsV2 = await upgrades.deployProxy(DaoEvents,["0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"],{initializer: 'initialize'});
  await daoEventsV2.deployed();
  console.log("daoEventsV2-upgradeable deployed Address:", daoEventsV2.address);

  // const proxyAddress = '0xb819adb6d585dc321a9bc055faa6303b8d3cf186';  
  // const PolkalokrToken = await ethers.getContractFactory("PolkalokrToken");
  // const PolkalokrTokenAddress = await upgrades.prepareUpgrade (proxyAddress,PolkalokrToken);
  // console.log("PolkalokrToken upgrade address :",PolkalokrTokenAddress);
  
}

main();