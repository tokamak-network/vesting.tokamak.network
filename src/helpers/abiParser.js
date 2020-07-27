const fs = require('fs');
const path = require('path');
const abiPath = path.join(__dirname, '..', 'contracts', 'abi');

const TON = require('../contracts/TON.json');
const WTON = require('../contracts/WTON.json');
const DepositManager = require('../contracts/DepositManager.json');
const RootChainRegistry = require('../contracts/RootChainRegistry.json');
const SeigManager = require('../contracts/SeigManager.json');
const PowerTON = require('../contracts/PowerTON.json');
const RootChain = require('../contracts/RootChain.json');
const CustomIncrementCoinage = require('../contracts/CustomIncrementCoinage.json');

const TONABI = TON.abi;
const WTONABI = WTON.abi;
const DepositManagerABI = DepositManager.abi;
const RootChainRegistryABI = RootChainRegistry.abi;
const SeigManagerABI = SeigManager.abi;
const PowerTONABI = PowerTON.abi;
const RootChainABI = RootChain.abi;
const CustomIncrementCoinageABI = CustomIncrementCoinage.abi;
const ABIs = {
  TON: TONABI,
  WTON: WTONABI,
  DepositManager: DepositManagerABI,
  RootChainRegistry: RootChainRegistryABI,
  SeigManager: SeigManagerABI,
  PowerTON: PowerTONABI,
  RootChain: RootChainABI,
  CustomIncrementCoinage: CustomIncrementCoinageABI,
};

for (const [name, abi] of Object.entries(ABIs)) {
  fs.writeFileSync(`${abiPath}/${name}.json`, JSON.stringify(abi), 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  });
}
