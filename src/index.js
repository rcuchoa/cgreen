import { ethers } from "./ethers-5.2.esm.min.js";
import { initContract, getBalance } from "./app_ethers.js";

export let provider = {};
export let signer = {};

let ownerContract = '';
let contract_address_RioIPTUToken = '';
let contract_address_CariocaGreenTreeToken = '';
let contract_address_CariocaGreenSC = '';

// Read Blockchain Addresses from file
export async function fetchAddresses(blockchainNetwork) {
    await fetch('http://localhost:3000/assets/addresses.json')
            .then(data => {
                console.log(data);
                return data.json();
            })
            .then(addresses => {
                console.log(addresses);
                switch (blockchainNetwork) {
                    case "sepolia":  {
                        ownerContract = addresses['sepolia']['initialOwner'];
                        contract_address_RioIPTUToken = addresses['sepolia']['rioIPTUTokenAddress'];
                        contract_address_CariocaGreenTreeToken = addresses['sepolia']['cariocaGreenTreeTokenAddress'];
                        contract_address_CariocaGreenSC = addresses['sepolia']['cariocaGreenSCAddress'];
                        break;
                    }
                    case "localhost": {
                        ownerContract = addresses['localhost']['initialOwner'];
                        contract_address_RioIPTUToken = addresses['localhost']['rioIPTUTokenAddress'];
                        contract_address_CariocaGreenTreeToken = addresses['localhost']['cariocaGreenTreeTokenAddress'];
                        contract_address_CariocaGreenSC = addresses['localhost']['cariocaGreenSCAddress'];
                        break;
                    }
                    case "": {
                        ownerContract = '';
                        contract_address_RioIPTUToken = '';
                        contract_address_CariocaGreenTreeToken = '';
                        contract_address_CariocaGreenSC = '';
                        break;
                    };
                };
            })
            .catch(error => {
                console.log("Erro na leitura da arquivo addresses.json: ", error);
            });
};

fetchAddresses("localhost");

export const abi_url_RioIPTUToken = 'http://localhost:3000/assets/RioIPTUToken.json';
export let contract_RioIPTUToken = {};

export const abi_url_CariocaGreenTreeToken = 'http://localhost:3000/assets/CariocaGreenTreeToken.json';
export let contract_CariocaGreenTreeToken = {};

export const abi_url_CariocaGreenSC = 'http://localhost:3000/assets/CariocaGreenSC.json';
export let contract_CariocaGreenSC = {};

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('connectMetatask').addEventListener('click', function(event) {
        event.preventDefault();
        if (window.ethereum) {
            // Create an ethers provider using MetaMask provider
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            console.log('Conectado à Metamask: ', provider, signer);
            initContract(contract_address_RioIPTUToken, abi_url_RioIPTUToken)
                .then(_contract => {
                    contract_RioIPTUToken = _contract;
                    console.log("Contrato inicializado:", contract_RioIPTUToken)
                })
                .catch(error => {
                    console.log("Erro na inicialização do contrato:", error)
                });
            initContract(contract_address_CariocaGreenTreeToken, abi_url_CariocaGreenTreeToken)
                .then((_contract) => {
                    contract_CariocaGreenTreeToken = _contract;
                    console.log("Contrato inicializado:", contract_CariocaGreenTreeToken)
                })
                .catch(error => {
                    console.log("Erro na inicialização do contrato:", error)
                });
            initContract(contract_address_CariocaGreenSC, abi_url_CariocaGreenSC)
                .then((_contract) => {
                    contract_CariocaGreenSC = _contract;
                    console.log("Contrato inicializado:", contract_CariocaGreenSC);
                })
                .catch(error => {
                    console.log("Erro na inicialização do contrato:", error);
                });
        } else {
            console.log('Erro na conexão com Metatask!');
        };
    });

    document.getElementById('connectLocalhost').addEventListener('click', function(event) {
        event.preventDefault();
        // Create an ethers provider using Localhost provider
        provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
        signer = provider.getSigner();
        console.log('Conectado à Localhost: ', provider, signer);
        initContract(contract_address_RioIPTUToken, abi_url_RioIPTUToken)
            .then((_contract) => {
                contract_RioIPTUToken = _contract;
                console.log("Contrato inicializado:", contract_RioIPTUToken)
            })
            .catch(_error => {
                console.log("Erro na inicialização do contrato:", _error)
            });
        initContract(contract_address_CariocaGreenTreeToken, abi_url_CariocaGreenTreeToken)
            .then((_contract) => {
                contract_CariocaGreenTreeToken = _contract;
                console.log("Contrato inicializado:", contract_CariocaGreenTreeToken)
            })
            .catch(_error => {
                console.log("Erro na inicialização do contrato:", _error)
            });
        initContract(contract_address_CariocaGreenSC, abi_url_CariocaGreenSC)
            .then((_contract) => {
                contract_CariocaGreenSC = _contract;
                console.log("Contrato inicializado:", contract_CariocaGreenSC)
            })
            .catch(error => {
                console.log("Erro na inicialização do contrato:", error)
        });
    });

    //-- Group 1 --//
    document.getElementById('button1').addEventListener('click', function(event) {
        event.preventDefault();
        const input1_1 = document.getElementById('input1_1').value;
        console.log('CALLBACK_GRUPO1: ', input1_1);
        document.getElementById('output1').textContent = "Foto enviada com sucesso. Muito obrigado Carioca Green!";
    });

    //-- Group 2 --//
    document.getElementById('button2').addEventListener('click', function(event) {
        event.preventDefault();
        const input2_1 = document.getElementById('input2_1').value;
        console.log('CALLBACK_GRUPO2:', input2_1);
        document.getElementById('output2').textContent = "Parabéns! Continue sendo um carioca consciente!";
    });

    //-- Group 3 --//
    document.getElementById('button3').addEventListener('click', function(event) {
        event.preventDefault();
        const input3_1 = document.getElementById('input3_1').value;
        console.log('CALLBACK_GRUPO3:', input3_1);
        document.getElementById('output3').textContent = "Crédito enviado! Seu amigo deve estar feliz!";
    });

    //-- Group 4 --//
    document.getElementById('button4').addEventListener('click', function(event) {
        event.preventDefault();
        const input4_1 = document.getElementById('input4_1').value;
        const input4_2 = document.getElementById('input4_2').value;
        console.log('CALLBACK_GRUPO4:', input4_1, input4_2);
        document.getElementById('output4').textContent = "Parabéns! Continue sendo um carioca consciente!";

    });

    //-- Group 5 --//
    document.getElementById('button5').addEventListener('click', function(event) {
        event.preventDefault();
        const input5_1 = document.getElementById('input5_1').value;
        console.log('CALLBACK_GRUPO5:', input5_1);
        getBalance(input5_1, contract_RioIPTUToken)
            .then(_value => {
                console.log(_value);
                document.getElementById('output5').textContent = `Saldo de RIPTUs: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('output5').textContent = `Erro na leitura!`;
            });
    });

    //-- Group 6 --//
    document.getElementById('button6').addEventListener('click', function(event) {
        event.preventDefault();
        const input6_1 = document.getElementById('input6_1').value;
        console.log('CALLBACK_GRUPO6:', input6_1);
        getBalance(input6_1, contract_CariocaGreenTreeToken)
            .then(_value => {
                console.log(_value);
                document.getElementById('output6').textContent = `Saldo de CGTs: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('output6').textContent = `Erro na leitura!`;
            });
    });

    //-- Group 7 --//
    document.getElementById('button7').addEventListener('click', function(event) {
        event.preventDefault();
        const input7_1 = document.getElementById('input7_1').value;
        console.log('CALLBACK_GRUPO7:', input7_1);
        getBalance(input7_1, contract_CariocaGreenSC)
            .then(_value => {
                console.log(_value);
                document.getElementById('output7').textContent = `Saldo do SC: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('output7').textContent = `Erro na leitura!`;
            });
    });

});



