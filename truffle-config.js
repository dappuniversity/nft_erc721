require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(PRIVATE_KEY, API_KEY)
      }, 
      network_id: 3
    }

  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  }
}