import { ethers } from "./ethers-5.2.esm.min.js";
import { provider , signer } from "./index.js";

// Read the ABI from file
async function synchronousFetch(_url) {
    try {
      const response = await fetch(_url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data['abi'];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

//  Initialize Contracts
export async function initContract(_address, _abi_url) {
    const _abi = await synchronousFetch(_abi_url);
    console.log("Params Inicializa Contrato: ", _address, _abi_url, _abi, provider);
    const _contract = new ethers.Contract(_address, _abi, provider);
    return _contract;
};

// Get Balance
export async function getBalance(_wallet, _contract) {
    console.log("Contrato Balance: ", _wallet, _contract);

    await _contract.balanceOf(_wallet)
        .then(_result => {
            console.log("BALANCE: ", _result['_hex']);
            return (_result['_hex']);
        })
        .catch(_error => {
            console.log("ERRO:", _error);
        });
};
