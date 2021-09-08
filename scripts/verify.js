const hre = require("hardhat");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(`Connected to name: ${name} & chainId: ${chainId}`);

  const contractAddress = "0xD014e0672Fac865469BEe98E987c60D862b3BE70";
  const args = [
    "0x521855AA99a80Cb467A12b1881f05CF9440c7023", // rinkeby new phnx
    "0xb8B47C2F67f23616AE61ce174d9AE59E6649EfF7", // rinkeby new oracle
  ];
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
