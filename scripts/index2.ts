const fs = require('fs');
const { ethers, JsonRpcProvider } = require('ethers');

// Read the ABI from file
const file_path_CariocaGreenTreeToken = "src/artifacts/contracts/CariocaGreenTreeToken.sol/CariocaGreenTreeToken.json";
const abi_CariocaGreenTreeToken = JSON.parse(fs.readFileSync(file_path_CariocaGreenTreeToken))['abi'];

const file_path_RioIPTUToken = "src/artifacts/contracts/RioIPTUToken.sol/RioIPTUToken.json";
const abi_RioIPTUToken = JSON.parse(fs.readFileSync(file_path_RioIPTUToken))['abi'];

// Address of your contract
const address_CariocaGreenTreeToken = '0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf';
const address_RioIPTUToken = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';

// Initialize provider
const provider = new JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner()
    .then(signer => console.log("Signer:", signer.address))
    .catch(error => console.error("Error:", error));

// Create contract instance
const contract_RioIPTUToken = new ethers.Contract(address_RioIPTUToken, abi_RioIPTUToken, provider);
const contract_CariocaGreenTreeToken = new ethers.Contract(address_CariocaGreenTreeToken, abi_CariocaGreenTreeToken, provider);

contract_RioIPTUToken.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));

contract_CariocaGreenTreeToken.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));

contract_RioIPTUToken.mint(signer,100)
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));

contract_CariocaGreenTreeToken.safeMint(signer)
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));

contract_RioIPTUToken.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));

contract_CariocaGreenTreeToken.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    .then(result => console.log("Ballance:", result))
    .catch(error => console.error("Error:", error));