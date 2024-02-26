// scripts/index.js

import { ethers } from "hardhat";

async function main() {
    // Retrieve accounts from the local node
    const blockNumber = await ethers.provider.getBlockNumber();
    //console.log(blockNumber);

    // Set up an ethers contract, representing our deployed Box instance
    const addressRioIPTUToken = "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9";
    const RioIPTUToken = await ethers.getContractFactory("RioIPTUToken");
    const rioIPTUToken = await RioIPTUToken.attach(addressRioIPTUToken);

    console.log(addressRioIPTUToken);
    console.log(RioIPTUToken);
    console.log(rioIPTUToken);

    const addressCariocaGreenTreeToken = "0x95401dc811bb5740090279Ba06cfA8fcF6113778";
    const CariocaGreenTreeToken = await ethers.getContractFactory("CariocaGreenTreeToken");
    const cariocaGreenTreeToken = await CariocaGreenTreeToken.attach(addressCariocaGreenTreeToken);

    console.log(addressCariocaGreenTreeToken);
    console.log(CariocaGreenTreeToken);
    console.log(cariocaGreenTreeToken);


    //   Call the retrieve() function of the deployed Box contract
    const signer = await ethers.provider.getSigner();
    const ballance = await rioIPTUToken.getBallance(signer.address);
    console.log(`The ballance of ${signer} is ${ballance}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
});



const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_data",
                "type": "uint256"
            }
        ],
        "name": "setData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getData",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Address of your contract
const contractAddress = '0x123456789...';

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your_infura_project_id');

// Create contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Call the function
contract.getData().then(result => {
    console.log("Result:", result);
}).catch(error => {
    console.error("Error:", error);
});