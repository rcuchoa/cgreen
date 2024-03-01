// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CariocaGreenTreeToken.sol";
import "./RioIPTUToken.sol";

contract CariocaGreenSC is Ownable {

    address contractOwner;                                 // Save contract owner

    uint creditsPerPlantedTree;                            // Store number of credits (RIPTUs) per planted tree (CGT)

    address public cariocaGreenTreeTokenAddress;           // Save CGT Smart Contract Address
    address public rioIPTUTokenAddress;                    // Save RIPTU Smart Contract Address

    CariocaGreenTreeToken public cariocaGreenTreeToken;    // Instantiate CariocaGreenTreeToken smart contract
    RioIPTUToken public rioIPTUToken;                      // Instatiate RioIPTUToken smart contract
    
    mapping(address => uint) totalPlantedTrees;            // Store total number of trees (CGTs) planted by each citizen
    mapping(address => uint) totalCredits;                 // Store total number of credits (RIPTUs) owned by each citizen

    event CariocaGreenSCCreated(address indexed owner);                                               // Event to register smart contract creation
    event CariocaGreenTreeTokenCreated(address indexed owner);                                        // Event to register smart contract creation
    event RioIPTUTokenCreated(address indexed owner);                                                 // Event to register smart contract creation
 
    event PlantedTreeRegistered(address indexed citizen, uint indexed trees, uint indexed credits);   // Event to register a new planted tree registration
    event PlantedTreeUnregistered(address indexed citizen, uint indexed trees, uint indexed credits); // Event to register credits registration

    constructor(uint _creditsPerPlantedTree) Ownable(msg.sender) {
        require(_creditsPerPlantedTree > 0, "Total number of credits per Tree must be greater than zero");

        contractOwner = msg.sender;

        cariocaGreenTreeToken = new CariocaGreenTreeToken(contractOwner);
        rioIPTUToken = new RioIPTUToken(contractOwner);

        cariocaGreenTreeTokenAddress = address(cariocaGreenTreeToken);
        rioIPTUTokenAddress = address(rioIPTUToken);

        creditsPerPlantedTree = _creditsPerPlantedTree;

        emit CariocaGreenSCCreated(contractOwner);
        emit CariocaGreenTreeTokenCreated(contractOwner);
        emit RioIPTUTokenCreated(contractOwner);
    }

    function getCariocaGreenTreeTokenAddress() public view returns (address) {
        return cariocaGreenTreeTokenAddress;
    }

    function getRioIPTUTokenAddress() public view returns (address) {
        return rioIPTUTokenAddress;
    }

    function getCariocaGreenTreeTokenBalance() public view returns (uint256) {
        return cariocaGreenTreeToken.balanceOf(msg.sender);
    }

    function getRioIPTUTokenBalance() public view returns (uint256) {
        return rioIPTUToken.balanceOf(msg.sender);
    }

    // Mint token NFT CGT
    function chainMintCGT (address _to) public onlyOwner {
        cariocaGreenTreeToken.safeMint(_to);                
    }

    // Mint tokens RIPTU
    function chainMintRIPTU (address _to) public onlyOwner {
        rioIPTUToken.mint(_to, creditsPerPlantedTree);      
    }

    // Destroy token NFT CGT
    function chainDestroyCGT (address _to) public onlyOwner {
        cariocaGreenTreeToken.safeMint(_to);                
    }

    // Destroy tokens RIPTU
    function chainDestroyRIPTU (address _to) public onlyOwner {
        rioIPTUToken.mint(_to, creditsPerPlantedTree);      
    }

    // Transfer tokens RIPTU
    function chainTransferRIPTU (address _to, uint _amount) public onlyOwner {
        rioIPTUToken.transfer(_to, _amount);
    }

    // Get the Balance of an address
    function balanceOf (address _address) public {
        return this.balanceOf(_address);
    }

    // Register a new planted tree
    function registerPlantedTree(address _address) public onlyOwner returns (uint) {
      totalPlantedTrees[_address]  += 1;
      totalCredits[_address] += creditsPerPlantedTree;

      chainMintCGT(_address);
      chainMintRIPTU(_address);

      emit PlantedTreeRegistered(_address, totalPlantedTrees[msg.sender], totalCredits[msg.sender]);

      return totalPlantedTrees[_address];
    }

    // Unregister a planted tree
    function unregisteredPlantedTree(address _address) public onlyOwner returns (uint) {
      require(totalPlantedTrees[msg.sender] > 0, "Citizen does not have any planted tree.");

      totalPlantedTrees[msg.sender]  -= 1;
      totalCredits[msg.sender] -= creditsPerPlantedTree;

      emit PlantedTreeUnregistered(_address, totalPlantedTrees[msg.sender], totalCredits[msg.sender]);

      return totalPlantedTrees[_address];
    }

    // Get total number of planted trees
    function getPlantedTrees() public view returns (uint){
      return (totalPlantedTrees[msg.sender]);
    }

    // Get total number of credits
    function getTotalCredits() public view returns (uint){

      return(totalCredits[msg.sender]);
    }

    // Citizen call this funtion to get his total number of credits
    function transferCredits(address _to, uint _amount) public returns (uint){
      require(totalCredits[msg.sender] >= _amount, "Citizen does not have enough credits to transfer.");

      totalCredits[msg.sender] -= _amount;
      totalCredits[_to] += _amount;

      chainTransferRIPTU(_to, _amount);

      return(totalCredits[msg.sender]);
    }
}
