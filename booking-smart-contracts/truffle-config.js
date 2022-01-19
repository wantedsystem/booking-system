require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
module.exports = {
  networks: {
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
      },
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
