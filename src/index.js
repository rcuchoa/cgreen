import { ethers } from "./ethers@6.11.1.js";


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

function delay(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
};

async function connectToMetamask () {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        console.log("DEBUG: SUCCESS: PROVIDER/SIGNER CREATED: ", provider, signer);
    } catch (error) {
        console.log("DEBUG: ERROR: PROVIDER NOT CREATED ", error);
    }
};


// Read addresses for blockchain users and contracts from json file
async function fetchAddresses() {
    return fetch('http://localhost:3000/assets/addresses.json')
            .then(_addressesJson => {
                return _addressesJson.json();
            })
            .then(addresses => {
                networkName = addresses['networkName'];
                chainID = addresses['chainID'];
                ownerAddress = addresses['ownerAddress'];
                user1Address = addresses['user1Address'];
                user2Address = addresses['user2Address'];
                contract_address_CariocaGreenSC = addresses['contract_address_CariocaGreenSC'];
                contract_address_RioIPTUToken = addresses['contract_address_RioIPTUToken'];
                contract_address_CariocaGreenTreeToken = addresses['contract_address_CariocaGreenTreeToken'];
                console.log("DEBUG: SUCCESS: ADDRESSES FETCHED: ", addresses);
            })
            .catch(error => {
                console.log("DEBUG: ERROR: ADDRESSES NOT FETCHED: ", error);
            });
};

// Get all addresses for blockchain users and contracts
async function getContractAddresses() {
    return new Promise((resolve, reject) => {
        Promise.all([
            getRioIPTUTokenAddress(),
            getCariocaGreenTreeTokenAddress()
        ])
        .then(([_contract_address_RioIPTUToken, _contract_address_CariocaGreenTreeToken]) => {
            contract_address_RioIPTUToken = _contract_address_RioIPTUToken;
            contract_address_CariocaGreenTreeToken = _contract_address_CariocaGreenTreeToken;
            console.log("DEBUG: SUCCESS: getContractAddresses(): ", contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
            resolve((contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken));
        })
        .catch(error => {
            console.log("DEBUG: ERROR: getContractAddresses(): ", error);
            reject("NOT OK");
        });
    });
};

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

// Initialize Smart Contract CariocaGreenSC
async function initContractCariocaGreenSC() {
    const _abi = await fetchABI(abi_url_CariocaGreenSC);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_CariocaGreenSC, abi_url_CariocaGreenSC, _abi, signer);
    const _contract = new ethers.Contract(contract_address_CariocaGreenSC, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: CariocaGreenSC : ", _contract);
        return _contract;
    } else {
        throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: CariocaGreenSC`);
    }
};

// Initialize Smart Contract RioIPTUToken
async function initContractRioIPTUToken() {
    const _abi = await fetchABI(abi_url_RioIPTUToken);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_RioIPTUToken, abi_url_RioIPTUToken, _abi, signer);
    const _contract = new ethers.Contract(contract_address_RioIPTUToken, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: RioIPTUToken : ", _contract);
        return _contract;
    } else {
        throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: RioIPTUToken`);
    }
};

// Initialize Smart Contract CariocaGreenTreeToken
async function initContractCariocaGreenTreeToken() {
    const _abi = await fetchABI(abi_url_CariocaGreenTreeToken);
    console.log("DEBUG: INIT CONTRACT PARAMS: ", contract_address_CariocaGreenTreeToken, abi_url_CariocaGreenTreeToken, _abi, signer);
    const _contract = new ethers.Contract(contract_address_CariocaGreenTreeToken, _abi, signer);
    if (_contract) {
        console.log("DEBUG: SUCCESS: CONTRACT CREATED: CariocaGreenTreeToken : ", _contract);
        return _contract;
    } else {
        throw new Error(`DEBUG: ERROR: CONTRACT INIT ERROR: CariocaGreenTreeToken`);
    }
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
  export async function connectToDesiredBlockchainNetwork(_desiredNetworkName, _chainID) {
    console.log(`DEBUG: connectToDesiredBlockchainNetwork: `, _desiredNetworkName, _chainID);
    await provider.getNetwork()
      .then((_network) => {
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
  
//Connect to Blockchain and initialize all Smart Contracts
export async function initBlockchain() {
    try {
        await connectToMetamask();
        console.log("DEBUG: (1) : connectToMetamask : ", provider, signer);
        await fetchAddresses();
        console.log("DEBUG: (2) : fetchAddresses : ", addresses);
        await connectToDesiredBlockchainNetwork(networkName, chainID);
        console.log("DEBUG: (3) : connectToDesiredBlockchainNetwork : ", networkName, chainID);
        contract_CariocaGreenSC = await initContractCariocaGreenSC();
        console.log("DEBUG: (4): initContractCariocaGreenSC : ", contract_CariocaGreenSC);
        await createChildContracts();
        console.log("DEBUG: (5) : createChildContracts : ");
        await getContractAddresses();
        console.log("DEBUG: (6) : getContractAddresses : ", contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
        contract_RioIPTUToken = await initContractRioIPTUToken();
        console.log("DEBUG: (7): initContractRioIPTUToken : ", contract_RioIPTUToken);
        contract_CariocaGreenTreeToken = await initContractCariocaGreenTreeToken();
        console.log("DEBUG: (8): initContractCariocaGreenTreeToken : ", contract_CariocaGreenTreeToken);
    } catch (error) {
        console.log("DEBUG: ERROR: CONTRACTS NOT CREATED: ", error);
    }
};


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
};

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
};

// Send ETH to account
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
};

// Generic contract call function
async function callContract(_contract, _function, _param) {
    // Check if MetaMask is installed
    if (window.ethereum) {
        try {
            // Request user permission to access their MetaMask account
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Call a contract function
            const result = await _contract[_function](_param); // Use bracket notation
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error('MetaMask not found');
    };
};

// Register a tree and mint all tokens
export async function registerTree(_address) {
    console.log("DEBUG: (1) : registerTree(_address): ", _address);
    return new Promise((resolve, reject) => {
        console.log("DEBUG: (2) : registerTree(_address): ", _address, signer, contract_CariocaGreenSC);
        contract_CariocaGreenSC.registerTree(_address)
            .then(() => {
                console.log("DEBUG: (3) SUCCESS: registerTree(_address): ");
                resolve(_result['hash']);
            })
            .catch(_error => {
                console.log("DEBUG: (3) ERROR: registerTree(_address): ", _error);
                reject (new Error ('Contract call registerTree error!'));
            })
        });
};

// Create child contracts
export async function createChildContracts() {
    console.log("DEBUG: (1) : createChildContracts(): ");
    return new Promise((resolve, reject) => {
        console.log("DEBUG: (2) : createChildContracts(): ", signer, contract_CariocaGreenSC);
        contract_CariocaGreenSC.createChildContracts()
            .then( () => {
                console.log("DEBUG: (3) SUCCESS: createChildContracts(): ");
                resolve(_result['hash']);
            })
            .catch(_error => {
                console.log("DEBUG: (3) ERROR: createChildContracts(): ", _error);
                reject (new Error ('Contract call createChildContracts error!'));
            })
        });
};

// Transfer IPTU credits
export async function transferCredits(_to, _amount) {
    console.log("DEBUG: transferCredits(_to, _amount): ", _to, _amount);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.connect(signer).transferCredits(_to, _amount)
            .then( () => {
                console.log("DEBUG: SUCCESS: transferCredits(_address): ");
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: transferCredits(_address): ", _error);
                reject (new Error ('Contract call transferCredits error!'));
            })
        });
};

// Get number of trees owned by an address
// export async function getTrees(_address) {
//     console.log("DEBUG: getTrees(_address): ", _address);
//     if (window.ethereum) {
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const result = await contract_CariocaGreenSC.getTrees(_address);
//             console.log('DEBUG: SUCCESS: getTrees(_address): ', result);
//             return result;
//         } catch (error) {
//             console.error('DEBUG: ERROR: getTrees(_address): ', error);
//         }
//     } else {
//         console.error('DEBUG: ERROR: getTrees(_address): METAMASK NOT INSTALLED!');
//     };
// };

// Get number of trees owned by an address
export async function getTrees(_address) {
    console.log("DEBUG: getTrees(_address): ", _address);
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getTrees(_address)
            .then(_result => {
                console.log("DEBUG: SUCCESS: getTrees(_address): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getTrees(_address): ", _error);
                reject (new Error ('Contract call getTrees error!'));
            })
        });
};

// Get number of IPTU credits owned by an address
export async function getCredits(_address) {
    console.log("DEBUG: getCredits(_address): ", _address);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getCredits(_address)
            .then(_result => {
                console.log("DEBUG: SUCCESS: getCredits(_address): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getCredits(_address): ", _error);
                reject (new Error ('Contract call getCredits error!'));
            })
        });
};

// Get the address of the CariocaGreenTreeToken contract created by CariocaRioSC
export async function getCariocaGreenTreeTokenAddress() {
    console.log("DEBUG: getCariocaGreenTreeTokenAddress(): ", contract_CariocaGreenSC);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getCariocaGreenTreeTokenAddress()
            .then(_result => {
                console.log("DEBUG: SUCCESS: getCariocaGreenTreeTokenAddress(): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getCariocaGreenTreeTokenAddress(): ", _error);
                reject('Contract call getCariocaGreenTreeTokenAddress error!');
            });
    });
};

// Get the address of the RioIPTUToken contract created by CariocaRioSC
export async function getRioIPTUTokenAddress() {
    console.log("DEBUG: getRioIPTUTokenAddress(): ", contract_CariocaGreenSC);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getRioIPTUTokenAddress()
            .then(_result => {
                console.log("DEBUG: SUCCESS: getRioIPTUTokenAddress(): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getRioIPTUTokenAddress(): ", _error);
                reject('Contract call getRioIPTUTokenAddress error!');
            });
    });
};

// Get the balance of the CariocaGreenTreeToken contract
export async function getCariocaGreenTreeTokenBalance() {
    console.log("DEBUG: getCariocaGreenTreeTokenBalance(): ", contract_CariocaGreenSC);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getCariocaGreenTreeTokenBalance()
            .then(_result => {
                console.log("DEBUG: SUCCESS: getCariocaGreenTreeTokenBalance(): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getCariocaGreenTreeTokenBalance(): ", _error);
                reject('Contract call getCariocaGreenTreeTokenBalance error!');
            });
    });
};

// Get the addres of the RioIPTUToken contract
export async function getRioIPTUTokenBalance() {
    console.log("DEBUG: getRioIPTUTokenBalance(): ", contract_CariocaGreenSC);    
    return new Promise((resolve, reject) => {
        contract_CariocaGreenSC.getRioIPTUTokenBalance()
            .then(_result => {
                console.log("DEBUG: SUCCESS: getRioIPTUTokenBalance(): ", _result);
                resolve(_result);
            })
            .catch(_error => {
                console.log("DEBUG: ERROR: getRioIPTUTokenBalance(): ", _error);
                reject('Contract call getRioIPTUTokenBalance error!');
            });
    });
};

//***************************** CALLBACK FUNCTIONS *****************************/

//-- Connect to Metamask --//
document.getElementById('connectMetamask').addEventListener('click', async function(event) {
    event.preventDefault();
    if (window.ethereum) {
        console.log("DEBUG: connectMetamask: ", networkName, chainID, provider, signer);
        await initBlockchain();                                // Initialize Blockchain network
        console.log("DEBUG: CONTRACTS ADDRESSES:", contract_address_CariocaGreenSC, contract_address_RioIPTUToken, contract_address_CariocaGreenTreeToken);
        document.getElementById('connectOutput').textContent = `Conectado à Metamask! Network: ${networkName} ChainID: ${chainID})!`;
    } else {
        document.getElementById('connectOutput').textContent = "Metamask não instalado!";
    };
});

//-- Group 1 --//
document.getElementById('button1').addEventListener('click', async function(event) {
    event.preventDefault();
    let input1_1 = document.getElementById('input1_1').value;
    if (!input1_1) {input1_1 = await getConnectedAccount()};
    if (!input1_1) {input1_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO1: ', input1_1);
    await registerTree(input1_1)
        .then(_value => {
            document.getElementById('output1').textContent = `Árvore registrada com sucesso! (HASH: ${_value})`;
        })
        .catch(_error => {
            document.getElementById('output1').textContent = `Erro no registro de árvore plantada! (Cidadão: ${_error})`;
        });
});

//-- Group 2 --//
document.getElementById('button2').addEventListener('click', async function(event) {
    event.preventDefault();
    let input2_1 = document.getElementById('input2_1').value;
    if (!input2_1) {input2_1 = await getConnectedAccount()};
    if (!input2_1) {input2_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO2:', input2_1);
    await getTrees(input2_1)
        .then(_value => {
            document.getElementById('output2').textContent = `Número total de árvores plantadas: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output2').textContent = `Erro na leitura do número total de árvores plantadas!`;
        });
});

//-- Group 3 --//
document.getElementById('button3').addEventListener('click', async function(event) {
    event.preventDefault();
    let input3_1 = document.getElementById('input3_1').value;
    if (!input3_1) {input3_1 = await getConnectedAccount()};
    if (!input3_1) {input3_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO3:', input3_1);
    await getCredits(input3_1)
        .then(_value => {
            document.getElementById('output3').textContent = `Número total de créditos de IPTU: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output3').textContent = `Erro na leitura do número total de créditos de IPTU!`;
        });
});

//-- Group 4 --//
document.getElementById('button4').addEventListener('click', async function(event) {
    event.preventDefault();
    let input4_1 = document.getElementById('input4_1').value;
    let input4_2 = document.getElementById('input4_2').value;
    if (!input4_1) {input4_1 = await getConnectedAccount()};
    if (!input4_1) {input4_1 = ownerAddress};
    if (!input4_2) {input4_2 = 0};
    console.log('DEBUG: CALLBACK_GRUPO4:', input4_1, input4_2);
    await transferCredits(input4_1, input4_2)
        .then(_value => {
            document.getElementById('output4').textContent = `Transferência de ${input4_2} créditos realizada com sucesso`;
        })
        .catch(_error => {
            document.getElementById('output4').textContent = `Erro na transferência de créditos de IPTU`;
        });
});

//-- Group 5 --//
document.getElementById('button5').addEventListener('click', async function(event) {
    event.preventDefault();
    let input5_1 = document.getElementById('input5_1').value;
    console.log('DEBUG: CALLBACK_GRUPO5:', input5_1);
    if (!input5_1) {input5_1 = await getConnectedAccount()};
    if (!input5_1) {input5_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO5:', input5_1);
    await getEtherBalance(input5_1)
        .then(_value => {
            document.getElementById('output5').textContent = `Saldo de ETH: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output5').textContent = `Erro na leitura do saldo de ETH!`;
        });
});

//-- Group 6 --//
document.getElementById('button6').addEventListener('click', async function(event) {
    event.preventDefault();
    let input6_1 = document.getElementById('input6_1').value;
    if (!input6_1) {input6_1 = await getConnectedAccount()};
    if (!input6_1) {input6_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO6:', input6_1, contract_CariocaGreenSC);
    await getCariocaGreenTreeTokenBalance(contract_CariocaGreenSC, input6_1)
        .then(_value => {
            document.getElementById('output6').textContent = `Saldo de tokens CGT: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output6').textContent = `Erro na leitura de tokens CGT!`;
        });
});

//-- Group 7 --//
document.getElementById('button7').addEventListener('click', async function(event) {
    event.preventDefault();
    let input7_1 = document.getElementById('input7_1').value;
    if (!input7_1) {input7_1 = await getConnectedAccount()};
    if (!input7_1) {input7_1 = ownerAddress};
    console.log('DEBUG: CALLBACK_GRUPO7:', input7_1, contract_CariocaGreenSC);
    await getRioIPTUTokenBalance(contract_CariocaGreenSC, input7_1)
        .then(_value => {
            document.getElementById('output7').textContent = `Saldo de tokens RIPTU: ${_value}`;
        })
        .catch(_error => {
            document.getElementById('output7').textContent = `Erro na leitura de tokens RIPTU!`;
        });
});

//-- Test Metamask --//
document.getElementById('testConnection').addEventListener('click', async function(event) {
    event.preventDefault();
    if (window.ethereum) {
        console.log("DEBUG: TEST CONNECTION: ", chainID, provider, contract_CariocaGreenSC);
        const testContract = contract_CariocaGreenSC;
        //const testContractName = await testContract.contractName();
        const testFunction = "getTrees";
        const resultTestConnection = await callContract(testContract, testFunction);       
        console.log("DEBUG: TEST CONNECTION:", resultTestConnection);
        document.getElementById('testConnectionOutput').textContent = `Contrato: ${testContract} | Função: ${testFunction} | Resultado: ${resultTestConnection}`;
    } else {
        document.getElementById('testConnectionOutput').textContent = "CONTRACT FUNCTION CALL FAILURE";
    };
});