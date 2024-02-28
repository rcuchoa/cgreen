import { ethers } from "./ethers-5.2.esm.min.js";
import { provider , signer } from "./index.js";
import { contract_RioIPTUToken, contract_CariocaGreenTreeToken, contract_CariocaGreenSC } from "./index.js";

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
    console.log("Params Inicializa Contrato: ", _address, _abi_url, _abi, signer);
    const _contract = new ethers.Contract(_address, _abi, provider);
    return _contract;
};

async function switchMetaMaskNetwork(_chainId) {

  const customNetwork = {
    chainId: `0x${_chainId.toString(16)}`
  };

  console.log(customNetwork);

  try {
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [customNetwork],
      });
      console.log('Network switched successfully!');
  } catch (error) {
      console.error('Error switching network:', error);
  }
};

export async function connectToMetaMask(_desiredNetworkName, _chainID) {
    // Request access to MetaMask account
    if (window.ethereum) {
      console.log("MetaMask plugin installed");
    } else {
      console.log("MetaMask plugin not installed");
    };
  
  const _provider = new ethers.providers.Web3Provider(window.ethereum);

  console.log(_provider);

  await _provider.getNetwork()
    .then((_network) => {
      console.log(_network.name);
      return _network.name;
    })
    .then((_networkName) => {
      if (_networkName.toLowerCase() !== _desiredNetworkName.toLowerCase()) {
        console.log(`MetaMask is connected to network ${_networkName}. Please connect to ${_desiredNetworkName}.`);
        console.log(`Switching to network ${_desiredNetworkName}.`);
        switchMetaMaskNetwork(_chainID);
      } else {
        console.log('Connected to MetaMask network ${_desiredNetworkName}.');
      }
    })
    .catch((_error) => {
      console.log("Not connected to MetaMask: ", _error);
    });
};
  
export async function signAndSendEther(_from, _to, _value) {
    // Request user permission to connect MetaMask
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((_result) => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("OK: window.ethereum.request: ", _result, _provider);
        const _signer = _provider.getSigner();
        console.log("OK: window.ethereum.request: ", _signer);
        return _signer;
      })
      .then((_signer) => {
        console.log("OK: window.ethereum.request: ", _signer);
        const _transaction = {
          to: _to,
          value: ethers.utils.parseEther(_value)
        };
        console.log("OK: window.ethereum.request: ", _transaction);
        const signedTransaction = _signer.sendTransaction(_transaction)
          .then((_result) => console.log("OK: _signer.sendTransaction: ", _result))
          .catch((_error) => console.log("ERROR: _signer.sendTransaction: ", _error));
      })
      .catch((_error) => {
        console.log("ERROR (signAndSendEthere): ", _error);
      });
}

export async function registerPlantedTree(_address) {
  console.log("registerPlantedTree: ", _address);

  await contract_CariocaGreenSC.registerPlantedTree(_address)
      .then(_result => {
          console.log("OK (registerPlantedTree): ", _result);
          return (_result['_hex']);
      })
      .catch(_error => {
          console.log("ERRO (registerPlantedTree):", _error);
      });
}

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
