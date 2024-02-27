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

    document.getElementById('formEnviarFoto').addEventListener('submit', function(event) {
        event.preventDefault();
        const photo = document.getElementById('inputEnviarFoto').value;
        console.log('Enviar Foto: ', photo);
        document.getElementById('divFoto').textContent = "Foto enviada. Muito obrigado Carioca Green!";
    });

    document.getElementById('formVerificarCredito').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputVerificarCredito').value;
        console.log('Verifica Credito:', address);
        document.getElementById('divCredito').textContent = "Parabéns! Continue sendo um carioca consciente!";
    });

    document.getElementById('formTransferirCredito').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputTransferirCredito').value;
        console.log('Transferir Credito:', address);
        document.getElementById('divTransferencia').textContent = "Crédito enviado! Seu amigo deve estar feliz!";
    });

    document.getElementById('formMinhasArvores').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputMinhasArvores').value;
        console.log('Minhas Arvores:', address);
        document.getElementById('divArvores').textContent = "Parabéns! Continue sendo um carioca consciente!";

    });

    document.getElementById('button1').addEventListener('click', function(event) {
        event.preventDefault();
        const _address = document.getElementById('inputField1').value;
        getBalance(_address, contract_RioIPTUToken)
            .then(_value => {
                console.log(_value);
                document.getElementById('resultArea1').textContent = `Saldo de RIPTUs: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('resultArea1').textContent = `Erro na leitura!`;
            });
    });

    document.getElementById('button2').addEventListener('click', function(event) {
        event.preventDefault();
        const _address = document.getElementById('inputField2').value;
        getBalance(_address, contract_CariocaGreenTreeToken)
            .then(_value => {
                console.log(_value);
                document.getElementById('resultArea2').textContent = `Saldo de CGTs: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('resultArea2').textContent = `Erro na leitura!`;
            });
    });

    document.getElementById('button3').addEventListener('click', function(event) {
        event.preventDefault();
        const _address = document.getElementById('inputField3').value;
        getBalance(_address, contract_CariocaGreenSC)
            .then(_value => {
                console.log(_value);
                document.getElementById('resultArea3').textContent = `Saldo do SC: ${_value}`;
            })
            .catch(_error => {
                console.log(_error);
                document.getElementById('resultArea3').textContent = `Erro na leitura!`;
            });
    });

});



