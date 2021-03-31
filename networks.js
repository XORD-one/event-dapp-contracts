const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 6000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_LINK, AccountIndex)
      },
      networkId: 4
    },
    maticT: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.MATIC_LINK, AccountIndex)
      },
      networkId: 80001
    }
  },
};