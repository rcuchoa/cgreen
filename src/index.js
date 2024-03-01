//import { ethers } from "./ethers-5.2.esm.min.js";
import { ethers } from "./ethers.js";


//***************************** GLOBAL VARIABLES USED IN ALL MODULES *****************************/

let addresses = {};

let networkName = '';
let chainID = 0;
let ownerAddress = '';
let user1Address = '';
let user2Address = '';
let contract_address_RioIPTUToken = '';
let contract_address_CariocaGreenTreeToken = '';
let contract_address_CariocaGreenSC = '';

const abi_url_RioIPTUToken = 'http://localhost:3000/assets/RioIPTUToken.json';
const abi_url_CariocaGreenTreeToken = 'http://localhost:3000/assets/CariocaGreenTreeToken.json';
const abi_url_CariocaGreenSC = 'http://localhost:3000/assets/CariocaGreenSC.json';

let contract_RioIPTUToken;
let contract_CariocaGreenTreeToken;
let contract_CariocaGreenSC;

let provider = {};
let signer = {};

//***************************** ETHER MISC FUNCTIONS *****************************/

// Create Provider and Signer to be used in all blockchain transaction thru Metamask
// async function connectToMetamask () {
//     provider = new ethers.providers.Web3Provider(window.ethereum)
//         .then(()=>{
//             signer = provider.getSigner();
//             console.log("DEBUG: SUCCESS: SIGNER CREATED: ", signer);
//         })
//         .catch((_error)=>{
//             console.log("DEBUG: ERROR: PROVIDER NOT CREATED ", _error);
//         });
// };

async function connectToMetamask () {
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        console.log("DEBUG: SUCCESS: PROVIDER/SIGNER CREATED: ", provider, signer);
    } catch (error) {
        console.log("DEBUG: ERROR: PROVIDER NOT CREATED ", error);
    }
}


// Read addresses for blockchain users and contracts from json file
async function fetchAddresses() {
    await fetch('http://localhost:3000/assets/addresses.json')
            .then(_addressesJson => {
                return _addressesJson.json();
            })
            .then(addresses => {
                networkName = addresses['networkName'];
                chainID = addresses['chainID'];
                ownerAddress = addresses['ownerAddress'];
                user1Address = addresses['user1Address'];
                user2Address = addresses['user2Address'];
                contract_address_RioIPTUToken = addresses['contract_address_RioIPTUToken'];
                contract_address_CariocaGreenTreeToken = addresses['contract_address_CariocaGreenTreeToken'];
                contract_address_CariocaGreenSC = addresses['contract_address_CariocaGreenSC'];
                console.log("DEBUG: SUCCESS: ADDRESSES FETCHED: ", addresses);
            })
            .catch(error => {
                console.log("DEBUG: ERROR: ADDRESSES NOT FETCHED: ", error);
            });
};

// Get all addresses for blockchain users and contracts
await fetchAddresses();               

// Read Smart Contract ABI from file
async function fetchABI(_url) {
    try {
      const response = await fetch(_url);
      if (!response.ok) {
        throw new Error('DEBUG: ERROR: COULD NOT FETCH ABI FILE: NETWORK ERROR');
      }
      const data = await response.json();
      return data['abi'];
    } catch (error) {
      console.error('DEBUG: ERROR: COULD NOT PARSE ABI FILE:', error);
      throw error;
    }
};

//  Initialize Smart Contract
async function initContract(_address, _abi_url) {
    const _abi = await fetchABI(_abi_url);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", _address, _abi_url, _abi, signer);
    const _contract = new ethers.Contract(_address, _abi, signer);
    return _contract;
};

//  Initialize all project Smart Contracts
export async function initAllContracts () {
  await initContract(contract_address_RioIPTUToken, abi_url_RioIPTUToken)
      .then(_contract => {
          contract_RioIPTUToken = _contract;
          console.log("DEBUG: SUCCESS: CONTRACT (RioIPTUToken) INITIALIZED: ", contract_RioIPTUToken)
      })
      .catch(error => {
          console.log("DEBUG: ERROR: CONTRACT (RioIPTUToken) NOT INITIALIZED: ", error)
      });
  await initContract(contract_address_CariocaGreenTreeToken, abi_url_CariocaGreenTreeToken)
      .then((_contract) => {
          contract_CariocaGreenTreeToken = _contract;
          console.log("DEBUG: SUCCESS: CONTRACT (CariocaGreenTreeToken) INITIALIZED: ", contract_CariocaGreenTreeToken)
      })
      .catch(error => {
          console.log("DEBUG: ERROR: CONTRACT (CariocaGreenTreeToken) NOT INITIALIZED: ", error)
      });
  await initContract(contract_address_CariocaGreenSC, abi_url_CariocaGreenSC)
      .then((_contract) => {
          contract_CariocaGreenSC = _contract;
          console.log("DEBUG: SUCCESS: CONTRACT (CariocaGreenSC) INITIALIZED: ", contract_CariocaGreenSC);
      })
      .catch(error => {
          console.log("DEBUG: ERROR: CONTRACT (CariocaGreenSC) NOT INITIALIZED: ", error);
      });
};

//  Switch blockchain network on Metamask
async function switchNetwork(_chainId) {

  const customNetwork = {
    chainId: `0x${_chainId.toString(16)}`
  };

  try {
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [customNetwork],
      });
      console.log('DEBUG: SUCCESS: NETWORK SWITCHED: ');
  } catch (error) {
      console.error('DEBUG: ERROR: NETWORK NOT SWITCHED: ', error);
  }
};

//  Connect to a blockchain network on Metamask
export async function connectToBlockchain(_desiredNetworkName, _chainID) {

  await provider.getNetwork()
    .then((_network) => {
      console.log(_network.name);
      return _network.name;
    })
    .then((_networkName) => {
      if (_networkName.toLowerCase() !== _desiredNetworkName.toLowerCase()) {
        console.log(`DEBUG: METAMASK IS CONNECTED TO NETWORK ${_networkName}.`);
        console.log(`DEBUG: SWITCHING TO NETWORK ${_desiredNetworkName}.`);
        switchNetwork(_chainID);
      } else {
        console.log(`DEBUG: METAMASK IS CONNECTED TO NETWORK ${_desiredNetworkName}.`);
      }
    })
    .catch((_error) => {
      console.log("DEBUG: ERROR: COULD NOT GET METAMASK NETWORK", _error);
    });
};

// export function getConnectedAccount () {
//     // Check if MetaMask is installed and enabled
//     if (window.ethereum) {
//         // Request access to the user's accounts
//         window.ethereum.request({ method: 'eth_requestAccounts' })
//             .then((accounts) => {
//                 // Get the current active account
//                 const currentAccount = accounts[0];
//                 console.log("DEBUG: SUCCESS: CONNECTED ACCOUNT: ", currentAccount);
//                 return currentAccount;
//             })
//             .catch((error) => {
//                 console.error("DEBUG: ERROR: COULD NOT GET CONNECTED ACCOUNT:", error);
//                 return null;
//             });
//     } else {
//         console.error("DEBUG: ERROR: METAMASK NOT INSTALLED:");
//         return null;
//     }
// };

export async function getConnectedAccount () {
    // Check if MetaMask is installed and enabled
    if (window.ethereum) {
        try {
            // Request access to the user's accounts
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the current active account
            const currentAccount = accounts[0];
            console.log("DEBUG: SUCCESS: CONNECTED ACCOUNT: ", currentAccount);
            return currentAccount;
        } catch (error) {
            console.error("DEBUG: ERROR: COULD NOT GET CONNECTED ACCOUNT:", error);
            return null;
        }
    } else {
        console.error("DEBUG: ERROR: METAMASK NOT INSTALLED:");
        return null;
    }
};


//***************************** CONTRACTS FUNCTIONS *****************************/

// Get the address of the connected Ethereum account
async function getAddress() {
    const _address = await signer.getAddress();
    return _address;
}

// Get the ETH balance of the connected account
async function getEtherBalance(_address) {
    try {
        //const _address = await getAddress();
        const _balance = await provider.getBalance(_address);
        return (_balance);
    } catch (error) {
        console.error('DEBUG: ERROR: getEtherBalance():', error);
        return null;
    }
}

export async function sendEther(_to, _value) {
    console.log("DEBUG: sendEther(_to, _value): ", _value);

    // Setup transaction parameters
    const _transaction = {
          to: _to,
          value: ethers.utils.parseEther(_value)
    };
    // Setup transaction parameters
    const signedTransaction = signer.sendTransaction(_transaction)
        .then((_result) => {
            console.log("DEBUG: SUCCESS: sendEther(_to, _value): ", _result);
        })
        .catch((_error) => {
            console.log("DEBUG: ERROR: sendEther(_to, _value): ", _error);
        });
}

export async function registerPlantedTree(_address) {
    console.log("DEBUG: (1) : registerPlantedTree(_address): ", _address);
    return new Promise((resolve, reject) => {
        console.log("DEBUG: (2) : registerPlantedTree(_address): ", _address);
        contract_CariocaGreenSC.connect(signer).registerPlantedTree(_address)
            .then(_result => {
                console.log("DEBUG: (3) SUCCESS: registerPlantedTree(_address): ", _result);
                resolve(_result['hash']);
            })
            .catch(_error => {
                console.log("DEBUG: (3) ERROR: registerPlantedTree(_address): ", _error);
                reject (new Error ('Contract call registerPlantedTree error!'));
            })
        });
};

export async function transferCredits(_to, _amount) {
    console.log("DEBUG: transferCredits(_to, _amount): ", _to, _amount);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.connect(signer).transferCredits(_to, _amount)
            .then(_result => {
                console.log("DEBUG: SUCCESS: transferCredits(_address): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: transferCredits(_address): ", _error);
                reject (new Error ('Contract call transferCredits error!'));
            })
        });
}

export async function getPlantedTrees(_address) {
    console.log("DEBUG: getPlantedTrees(_address): ", _address);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getPlantedTrees(_address)
            .then(_result => {
                console.log("DEBUG: SUCCESS: getPlantedTrees(_address): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getPlantedTrees(_address): ", _error);
                reject (new Error ('Contract call getPlantedTrees error!'));
            })
        });
}

export async function getTotalCredits(_address) {
    console.log("DEBUG: getTotalCredits(_address): ", _address);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getTotalCredits(_address)
            .then(_result => {
                console.log("DEBUG: SUCCESS: getTotalCredits(_address): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getTotalCredits(_address): ", _error);
                reject (new Error ('Contract call getTotalCredits error!'));
            })
        });
}

export async function getBalance(_contract) {
    console.log("DEBUG: getBalance(_contract): ", _contract);    
    return new Promise((resolve, reject) => {
        console.log("DEBUG: ", _contract);
        _contract.connect(signer).getBalance()
            .then(_result => {
                console.log("DEBUG: SUCCESS: getBalance(_contract): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getBalance(_contract): ", _error);
                reject (new Error ('Contract call getBalance error!'));
            });
        });
}

//***************************** CALLBACK FUNCTIONS *****************************/

//-- Connect to Metamask --//
document.getElementById('connectMetamask').addEventListener('click', function(event) {
    event.preventDefault();
    if (window.ethereum) {
        console.log("DEBUG: connectMetamask: ", networkName, chainID, provider, signer);
        fetchAddresses();                               // Fetch blockchain address from file created during deploy
        connectToMetamask();                            // Create provider and signer
        connectToBlockchain(networkName, chainID);      // Connect to desired blockchain network
        initAllContracts();                             // Initialize all smart contracts
        document.getElementById('connectOutput').textContent = `Conectado à Metamask! Network: ${networkName} ChainID: ${chainID})!`;
    } else {
        document.getElementById('connectOutput').textContent = "Metamask não instalado!";
    };
});

//-- Group 1 --//
document.getElementById('button1').addEventListener('click', function(event) {
    event.preventDefault();
    let input1_1 = document.getElementById('input1_1').value;
    //if (!input1_1) {input1_1 = getConnectedAccount()};
    if (!input1_1) {input1_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO1: ', input1_1);
    registerPlantedTree(input1_1)
        .then(_value => {
            document.getElementById('output1').textContent = `Árvore registrada com sucesso! (HASH: ${_value})`;
        })
        .catch(_error => {
            document.getElementById('output1').textContent = `Erro no registro de árvore plantada! (Cidadão: ${_error})`;
        });
});

//-- Group 2 --//
document.getElementById('button2').addEventListener('click', function(event) {
    event.preventDefault();
    let input2_1 = document.getElementById('input2_1').value;
    //if (!input2_1) {input2_1 = getConnectedAccount()};
    if (!input2_1) {input2_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO2:', input2_1);
    getPlantedTrees(input2_1)
        .then(_value => {
            document.getElementById('output2').textContent = `Número total de árvores plantadas: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output2').textContent = `Erro na leitura do número total de árvores plantadas!`;
        });
});

//-- Group 3 --//
document.getElementById('button3').addEventListener('click', function(event) {
    event.preventDefault();
    let input3_1 = document.getElementById('input3_1').value;
    //if (!input3_1) {input3_1 = getConnectedAccount()};
    if (!input3_1) {input3_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO3:', input3_1);
    getTotalCredits(input3_1)
        .then(_value => {
            document.getElementById('output3').textContent = `Número total de créditos de IPTU: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output3').textContent = `Erro na leitura do número total de créditos de IPTU!`;
        });
});

//-- Group 4 --//
document.getElementById('button4').addEventListener('click', function(event) {
    event.preventDefault();
    let input4_1 = document.getElementById('input4_1').value;
    let input4_2 = document.getElementById('input4_2').value;
    //if (!input4_1) {input4_1 = getConnectedAccount()};
    if (!input4_1) {input4_1 = ownerAddress};
    if (!input4_2) {input4_2 = 0};
    console.log('DEBUG: CALLBACK_GRUPO4:', input4_1, input4_2);
    transferCredits(input4_1, input4_2)
        .then(_value => {
            document.getElementById('output4').textContent = `Transferência de ${input4_2} créditos realizada com sucesso`;
        })
        .catch(_error => {
            document.getElementById('output4').textContent = `Erro na transferência de créditos de IPTU`;
        });
});

//-- Group 5 --//
document.getElementById('button5').addEventListener('click', function(event) {
    event.preventDefault();
    let input5_1 = document.getElementById('input5_1').value;
    console.log('DEBUG: CALLBACK_GRUPO5:', input5_1);
    //if (!input5_1) {input5_1 = getConnectedAccount()};
    if (!input5_1) {input5_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO5:', input5_1);
    getEtherBalance(input5_1)
        .then(_value => {
            document.getElementById('output5').textContent = `Saldo de ETH: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output5').textContent = `Erro na leitura do saldo de ETH!`;
        });
});

//-- Group 6 --//
document.getElementById('button6').addEventListener('click', function(event) {
    event.preventDefault();
    let input6_1 = document.getElementById('input6_1').value;
    //if (!input6_1) {input6_1 = getConnectedAccount()};
    if (!input6_1) {input6_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO6:', input6_1, contract_CariocaGreenTreeToken);
    getBalance(contract_CariocaGreenTreeToken, input6_1)
        .then(_value => {
            document.getElementById('output6').textContent = `Saldo de tokens CGT: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output6').textContent = `Erro na leitura de tokens CGT!`;
        });
});

//-- Group 7 --//
document.getElementById('button7').addEventListener('click', function(event) {
    event.preventDefault();
    let input7_1 = document.getElementById('input7_1').value;
    //if (!input7_1) {input7_1 = getConnectedAccount()};
    if (!input7_1) {input7_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO7:', input7_1, contract_RioIPTUToken);
    getBalance(contract_RioIPTUToken, input7_1)
        .then(_value => {
            document.getElementById('output7').textContent = `Saldo de tokens RIPTU: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output7').textContent = `Erro na leitura de tokens RIPTU!`;
        });
});
