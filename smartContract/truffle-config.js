
const HDWalletProvider = require('@truffle/hdwallet-provider');
//ssafy
const privateKey ="eff3020d9a0c756d52f7e330556b2c162085681cc82bdfb9d64a156ec641c54f";
//ropsten
const infuraKey = "07887e7c080a401ba72016439b25c29f";
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    ganache: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: 5777,       // Any network (default: none)
    },

    ssafy: {
      provider: () => new HDWalletProvider(privateKey, "ws://20.196.209.2:6174"),
      network_id: "*",       // Goerli's id
      chainId: 31221,
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/07887e7c080a401ba72016439b25c29f`),
        network_id: "*",       // Ropsten's id
        gas: 5500000,        // Ropsten has a lower block limit than mainnet
        confirmations: 2,    // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },
    },
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200
      },
      //  evmVersion: "byzantium"
      // }
    }
  }

};