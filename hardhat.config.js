// import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "hardhat-gas-reporter";
// import "solidity-coverage";

// import "./tasks/accounts";
// import "./tasks/clean";

// import { resolve } from "path";

// import { config as dotenvConfig } from "dotenv";
// import { HardhatUserConfig } from "hardhat/config";
// import { NetworkUserConfig } from "hardhat/types";

// dotenvConfig({ path: resolve(__dirname, "./.env") });

// const chainIds = {
//   ganache: 1337,
//   goerli: 5,
//   hardhat: 31337,
//   kovan: 42,
//   mainnet: 1,
//   rinkeby: 4,
//   ropsten: 3,
// };

// // Ensure that we have all the environment variables we need.
// const mnemonic = process.env.MNEMONIC;
// if (!mnemonic) {
//   throw new Error("Please set your MNEMONIC in a .env file");
// }

// const infuraApiKey = process.env.INFURA_API_KEY;
// if (!infuraApiKey) {
//   throw new Error("Please set your INFURA_API_KEY in a .env file");
// }

// function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
//   const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
//   return {
//     accounts: {
//       count: 10,
//       initialIndex: 0,
//       mnemonic,
//       path: "m/44'/60'/0'/0",
//     },
//     chainId: chainIds[network],
//     url,
//   };
// }

// const config: HardhatUserConfig = {
//   defaultNetwork: "hardhat",
//   gasReporter: {
//     currency: "USD",
//     enabled: process.env.REPORT_GAS ? true : false,
//     excludeContracts: [],
//     src: "./contracts",
//   },
//   networks: {
//     hardhat: {
//       accounts: {
//         mnemonic,
//       },
//       chainId: chainIds.hardhat,
//     },
//     goerli: createTestnetConfig("goerli"),
//     kovan: createTestnetConfig("kovan"),
//     rinkeby: createTestnetConfig("rinkeby"),
//     ropsten: createTestnetConfig("ropsten"),
//   },
//   paths: {
//     artifacts: "./artifacts",
//     cache: "./cache",
//     sources: "./contracts",
//     tests: "./test",
//   },
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       metadata: {
//         // Not including the metadata hash
//         // https://github.com/paulrberg/solidity-template/issues/31
//         bytecodeHash: "none",
//       },
//       // You should disable the optimizer when debugging
//       // https://hardhat.org/hardhat-network/#solidity-optimizer-support
//       optimizer: {
//         enabled: true,
//         runs: 800,
//       },
//     },
//   },
//   typechain: {
//     outDir: "typechain",
//     target: "ethers-v5",
//   },
// };

// export default config;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
// for web3 and truffle compatibility
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");
// verify contract on etherscan
require("@nomiclabs/hardhat-etherscan");
// for exporting abi in separate file
require("hardhat-abi-exporter");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.17",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.5",
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
      },
    ],
  },
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    localhost: {
      url: "http://127.0.0.1:7545",
    },

    /* ETHEREUM TESTNETS */
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 3,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      // from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 4,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      // from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 5,
    },

    /* BINANCE SMART CHAIN */
    bscMainnet: {
      url: process.env.BSC_MAINNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 56,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 97,
    },

    /* MATIC L2 */
    maticMainnet: {
      url: process.env.MATIC_MAINNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 137,
    },
    maticTestnet: {
      url: process.env.MATIC_MUMBAI_TESTNET_RPC_URL,
      accounts: [
        `0x${process.env.PRIVATE_KEY_1}`,
        `0x${process.env.PRIVATE_KEY_2}`,
      ],
      from: `0x${process.env.PRIVATE_KEY_1}`,
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "./abi-exporter",
    clear: true,
    flat: true,
    // only: [':ERC20$'],
    spacing: 2,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
