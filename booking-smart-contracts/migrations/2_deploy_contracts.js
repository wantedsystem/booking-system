const fs = require("fs");

const Bookings = artifacts.require("Bookings");

module.exports = function (deployer) {
  const configuration = {
    address: {},
  };

  deployer.then(async () => {
    /**
     * Deploy Bookings smart contract
     */
    await deployer.deploy(Bookings);
    configuration.address.Bookings = Bookings.address;
    console.log("  >> Bookings deployed at address", Bookings.address);

    writeConfigurationFile();
  });

  function writeConfigurationFile() {
    fs.writeFileSync(
      __dirname + "/deploy-config.json",
      JSON.stringify(
        {
          //
          VERSION: "DEV_V1.0",
          // address
          Bookings: configuration.address.Bookings,

          // abi
          Bookings_abi: Bookings.abi,
        },
        null,
        "\t"
      ),
      "utf-8"
    );
    console.log(
      "  >> Configuration written",
      __dirname + "/deploy-config.json"
    );
  }
};
