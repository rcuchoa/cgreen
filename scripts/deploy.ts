import { ethers } from "hardhat";
import hre from 'hardhat';

const network = hre.network.name;
const numRIPTUperTree = 100;

console.log(network);

const fs = require('fs');

let addresses;

try {
  const data = fs.readFileSync('./scripts/addresses.json', 'utf8');
  addresses = JSON.parse(data);
} catch (error) {
  console.error('Error reading or parsing JSON file:', error);
}

let initialOwner = "";  
let cariocaGreenTreeTokenSCAddress = "";
let rioIPTUTokenSCAddress = "";
let cariocaGreenSCAddress = "";

switch (network) {
  case "sepolia": {
    initialOwner = addresses['sepolia']['initialOwner'];  
    break;
  }
  case "localhost": {
    initialOwner = addresses['localhost']['initialOwner'];  
    break;
  }
  case "": {
    initialOwner = addresses['localhost']['initialOwner'];  
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
  const instanceCariocaGreenSC = await ContractFactoryCariocaGreenSC.deploy(initialOwner, numRIPTUperTree);
  await instanceCariocaGreenSC.waitForDeployment();
  cariocaGreenSCAddress = await instanceCariocaGreenSC.getAddress();
  console.log(`Contract Carioca Green deployed to ${cariocaGreenSCAddress}`);

  console.log("\n");
  console.log("Deploying to network:          ", network);
  console.log("Owner Address:                 ", initialOwner);  
  console.log("RioIPTUToken Address:          ", rioIPTUTokenSCAddress);
  console.log("CariocaGreenTreeToken Address: ", cariocaGreenTreeTokenSCAddress);
  console.log("CariocaGreenSC Address:        ", cariocaGreenSCAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
