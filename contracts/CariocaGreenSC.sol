// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CariocaGreenSC is Ownable {

    address contractOwner;                           // Save contract owner

    uint256 creditsPerPlantedTree;                         // Store number of credits (RIPTUs) per planted tree (CGT)
    //CariocaGreenTreeToken public cariocaGreenTreeToken;     // Instantiate CariocaGreenTreeToken smart contract
    //RioIPTUToken public rioIPTUToken;                       // Instatiate RioIPTUToken smart contract
    
    mapping(address => uint256) totalPlantedTrees;           // Store total number of trees (CGTs) planted by each citizen
    mapping(address => uint256) totalCredits;          // Store total number of credits (RIPTUs) owned by each citizen

    event CariocaGreenSCCreated(address indexed owner);                                                     // Event to register smart contract creation
    event PlantedTreeRegistered(address indexed citizen, uint256 indexed trees, uint256 indexed credits);   // Event to register a new planted tree registration
    event PlantedTreeUnRegistered(address indexed citizen, uint256 indexed trees, uint256 indexed credits); // Event to register credits registration


    constructor(uint256 _creditsPerPlantedTree) Ownable(msg.sender) {
        require(_creditsPerPlantedTree > 0, "Total number of credits per Tree must be greater than zero");

        contractOwner = msg.sender;

        creditsPerPlantedTree = _creditsPerPlantedTree;

        //cariocaGreenTreeToken = new CariocaGreenTreeToken(msg.sender);
        //rioIPTUToken = new RioIPTUToken(msg.sender);

        emit CariocaGreenSCCreated(msg.sender);
    }

    // function geraCreditosIPTU (address to) public onlyOwner {
    //     cariocaGreenTreeToken.safeMint(to);                // Gera uma token NFT CGT para registro da árvore
    //     rioIPTUToken.mint(to, numRIPTUperTree);            // Gera um conjunto de tokens RIPTU para registro dos créditos
    // }

    // function transferCreditosIPTU (address from, address to, uint256 amount) public onlyOwner {
    //     rioIPTUToken.transfer(from, to, amount);
    // }

    // function balanceOf (address wallet) public onlyOwner {
    //     return this.balanceOf(wallet);
    // }

    // Contract owner call this funtion to register a new planted tree
    function registerPlantedTree(address _citizen) public onlyOwner returns (uint256){
      totalPlantedTrees[_citizen]  += 1;
      totalCredits[_citizen] += creditsPerPlantedTree;

      emit PlantedTreeRegistered(_citizen, totalPlantedTrees[msg.sender], totalCredits[msg.sender]);

      return totalPlantedTrees[_citizen];
    }

    // Contract owner call this funtion to unregister a new planted tree
    function unregisterPlantedTree(address _citizen) public onlyOwner {
      require(totalPlantedTrees[msg.sender] > 0, "Citizen does not have any planted tree");

      totalPlantedTrees[msg.sender]  -= 1;
      totalCredits[msg.sender] -= creditsPerPlantedTree;

      emit PlantedTreeUnRegistered(_citizen, totalPlantedTrees[msg.sender], totalCredits[msg.sender]);
    }

    // Citizen call this funtion to get his total number of planted trees
    function getPlantedTrees(address _citizen) public view returns (uint256){
      require(msg.sender == contractOwner || msg.sender == _citizen, "Only own citizen or contract owner can call this function");
      return (totalPlantedTrees[_citizen]);
    }

    // Citizen call this funtion to get his total number of credits
    function getTotalCredits(address _citizen) public view returns (uint256){
      require(msg.sender == contractOwner || msg.sender == _citizen, "Only own citizen or contract owner can call this function");
      return(totalCredits[_citizen]);
    }
}
