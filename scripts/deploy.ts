import { ethers } from "hardhat";
import hre from 'hardhat';

const network = hre.network.name;
const creditsPerPlantedTree = 100;

console.log(network);

let ownerAddresses;

const fs = require('fs');

try {
  const data = fs.readFileSync('./scripts/owners.json', 'utf8');
  ownerAddresses = JSON.parse(data);
} catch (error) {
  console.error('Error reading or parsing JSON file:', error);
}

let addresses = {
                  "networkName": "",
                  "chainID": 0,
                  "ownerAddress": "",
                  "user1Address": "",
                  "user2Address": "",
                  "contract_address_RioIPTUToken": "",
                  "contract_address_CariocaGreenTreeToken": "",
                  "contract_address_CariocaGreenSC": ""
                };

let initialOwner = "";  
let cariocaGreenTreeTokenSCAddress = "";
let rioIPTUTokenSCAddress = "";
let cariocaGreenSCAddress = "";

switch (network) {
  case "sepolia": {
    initialOwner = ownerAddresses['sepolia']['initialOwner'];  
    break;
  }
  case "localhost": {
    initialOwner = ownerAddresses['localhost']['initialOwner'];  
    break;
  }
  default: {
    initialOwner = ownerAddresses['localhost']['initialOwner'];  
    break;
  }
};

async function main() {

  // Create Rio IPTU Token
  const ContractFactoryRioIPTUToken = await ethers.getContractFactory("RioIPTUToken");
  const instanceRioIPTUToken = await ContractFactoryRioIPTUToken.deploy(initialOwner);
  await instanceRioIPTUToken.waitForDeployment();
  rioIPTUTokenSCAddress = await instanceRioIPTUToken.getAddress();
  console.log(`Contract Rio IPTU Token deployed to ${rioIPTUTokenSCAddress}`);

  // Create Carioca Green Tree NFT
  const ContractFactoryCariocaGreenTreeToken = await ethers.getContractFactory("CariocaGreenTreeToken");
  const instanceCariocaGreenTreeToken = await ContractFactoryCariocaGreenTreeToken.deploy(initialOwner);
  await instanceCariocaGreenTreeToken.waitForDeployment();
  cariocaGreenTreeTokenSCAddress = await instanceCariocaGreenTreeToken.getAddress();
  console.log(`Contract Carioca Green Tree Token deployed to ${cariocaGreenTreeTokenSCAddress}`);

  // Create  Carioca Green Smart Contract
  const ContractFactoryCariocaGreenSC = await ethers.getContractFactory("CariocaGreenSC");
  const instanceCariocaGreenSC = await ContractFactoryCariocaGreenSC.deploy(creditsPerPlantedTree);
  await instanceCariocaGreenSC.waitForDeployment();
  cariocaGreenSCAddress = await instanceCariocaGreenSC.getAddress();
  console.log(`Contract Carioca Green deployed to ${cariocaGreenSCAddress}`);

  console.log("\n");

  console.log("Deploying to network:          ", network);
  console.log("Owner Address:                 ", initialOwner);  
  console.log("RioIPTUToken Address:          ", rioIPTUTokenSCAddress);
  console.log("CariocaGreenTreeToken Address: ", cariocaGreenTreeTokenSCAddress);
  console.log("CariocaGreenSC Address:        ", cariocaGreenSCAddress);

  addresses['networkName'] = network;
  addresses['ownerAddress'] = initialOwner;
  addresses['contract_address_RioIPTUToken'] = rioIPTUTokenSCAddress;
  addresses['contract_address_CariocaGreenTreeToken'] = cariocaGreenTreeTokenSCAddress;
  addresses['contract_address_CariocaGreenSC'] = cariocaGreenSCAddress;

  switch (network) {
    case "sepolia": {
      addresses['chainID'] = 11155111;
      addresses['ownerAddress'] = '0x0b0F536E11338dCC29ba67c788FB3B68119F4b90';  // Rodrigo Uchoa Sepolia Address
      addresses['user1Address'] = '0x51291C29B6c950483bC5960d3CCd9725BC8ed332';  // Marcelo Guarda Sepolia Address
      addresses['user2Address'] = '';
      break;
    }
    case "localhost": {
      addresses['chainID'] = 31337;
      addresses['ownerAddress'] = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';  // HardHat Node Account #0
      addresses['user1Address'] = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';  // HardHat Node Account #1
      addresses['user2Address'] = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';  // HardHat Node Account #2
      break;
    }
    default: {
      addresses['chainID'] = 31337;
      addresses['ownerAddress'] = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';  // HardHat Node Account #0
      addresses['user1Address'] = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';  // HardHat Node Account #1
      addresses['user2Address'] = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';  // HardHat Node Account #2
      break;
    }
  };


  // Write addresses.json file to src/assets directory
  try {
    const addressesJson = JSON.stringify(addresses, null, 2);
    fs.writeFileSync('./src/assets/addresses.json', addressesJson, { encoding: 'utf8', flag: 'w' });
  } catch (error) {
    console.error('Error writing file addresses.json:', error);
  }

//   // Generate ABI files from solcjs
//   const { exec } = require('child_process');

//   const command1 = 'solcjs --abi --include-path ./node_modules --base-path ./contracts --output-dir ./src/assets ./contracts/RioIPTUToken.sol';
//   exec(command1, (error: any, stdout: any, stderr: any) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }
//       console.log(`Command output: ${stdout}`);
//   });

//   const command2 = 'solcjs --abi --include-path ./node_modules --base-path ./contracts --output-dir ./src/assets ./contracts/CariocaGreenTreetoken.sol';
//   exec(command2, (error: any, stdout: any, stderr: any) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }
//       console.log(`Command output: ${stdout}`);
//   });

//   const command3 = 'solcjs --abi --include-path ./node_modules --base-path ./contracts --output-dir ./src/assets ./contracts/CariocaGreenSC.sol';
//   exec(command3, (error: any, stdout: any, stderr: any) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }
//       console.log(`Command output: ${stdout}`);
//   });

//   // Copy contracts ABI files to src/assets directory
//   try {
//     fs.copyFileSync("./artifacts/contracts/RioIPTUToken.sol/RioIPTUToken.json", "./src/assets/RioIPTUToken.json");
//     fs.copyFileSync("./artifacts/contracts/CariocaGreenTreeToken.sol/CariocaGreenTreeToken.json", "./src/assets/CariocaGreenTreeToken.json");
//     fs.copyFileSync("./artifacts/contracts/CariocaGreenSC.sol/CariocaGreenSC.json", "./src/assets/CariocaGreenSC.json");
//   } catch (error) {
//     console.error('Error writing file addresses.json:', error);
//   }

};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
