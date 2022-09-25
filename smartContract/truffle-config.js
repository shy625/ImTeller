

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const privateKey = "0x0c54E456CE9E4501D2c43C38796ce3F06846C966";


module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    // ssafynet: {
    //   provider: () => new HDWalletProvider(privateKey, "ws://20.196.209.2:6174"),
    //   network_id: "*",       // Goerli's id
    //   chainId: 31221,
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // },
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