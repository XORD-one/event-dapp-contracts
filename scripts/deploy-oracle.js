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
  createJson("carbonToken", oracle);
  // console.log(oracle);
  console.log(`Oracle address: ${oracle.address}`);

  function createJson(name, contract) {
    let addressObj = {};
    addressObj[chainId] = contract.address;
    // console.log(addressObj);

    fs.writeFileSync(
      `abis/${name}.json`,
      JSON.stringify({
        address: addressObj,
        abi: JSON.parse(contract.interface.format("json")),
      })
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
