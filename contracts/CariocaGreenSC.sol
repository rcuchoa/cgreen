// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CariocaGreenTreeToken.sol";
import "./RioIPTUToken.sol";

contract CariocaGreenSC /* is Ownable */  {

    address private contractOwner;                          // Save contract owner

    uint256 public minTransferAmount;


    uint private creditsPerTree = 0;                        // Store number of credits (RIPTUs) per tree (CGT)


    address private cariocaGreenTreeTokenAddress;           // Save CGT Smart Contract Address
    address private rioIPTUTokenAddress;                    // Save RIPTU Smart Contract Address

    CariocaGreenTreeToken private cariocaGreenTreeToken;    // Instantiate CariocaGreenTreeToken smart contract
    RioIPTUToken private rioIPTUToken;                      // Instatiate RioIPTUToken smart contract
    
    mapping(address => uint) private totalTrees;            // Store total number of trees (CGTs)  by each citizen
    mapping(address => uint) private totalCredits;          // Store total number of credits (RIPTUs) owned by each citizen

    event CariocaGreenSCCreated(address indexed owner);                                               // Event to register smart contract creation
    event CariocaGreenTreeTokenCreated(address indexed owner);                                        // Event to register smart contract creation
    event RioIPTUTokenCreated(address indexed owner);                                                 // Event to register smart contract creation
 
    event TreeRegistered(address indexed citizen, uint indexed trees, uint indexed credits);   // Event to register a new  tree registration
    event TreeUnregistered(address indexed citizen, uint indexed trees, uint indexed credits); // Event to register credits registration

    constructor(/* address _initialOwner,*/ uint _creditsPerTree) /* Ownable(_initialOwner) */ {
        require(_creditsPerTree > 0, "Total number of credits per Tree must be greater than zero");

        contractOwner = msg.sender;

        creditsPerTree = _creditsPerTree;

        cariocaGreenTreeToken = new CariocaGreenTreeToken(contractOwner);
        rioIPTUToken = new RioIPTUToken(contractOwner,  100);

        cariocaGreenTreeTokenAddress = address(cariocaGreenTreeToken);
        rioIPTUTokenAddress = address(rioIPTUToken);

        emit CariocaGreenSCCreated(contractOwner);
        emit CariocaGreenTreeTokenCreated(contractOwner);
        emit RioIPTUTokenCreated(contractOwner);
    }

    // function createChildContracts() public {
    //     cariocaGreenTreeToken = new CariocaGreenTreeToken(contractOwner);
    //     rioIPTUToken = new RioIPTUToken(contractOwner);

    //     cariocaGreenTreeTokenAddress = address(cariocaGreenTreeToken);
    //     rioIPTUTokenAddress = address(rioIPTUToken);

    //     emit CariocaGreenTreeTokenCreated(contractOwner);
    //     emit RioIPTUTokenCreated(contractOwner);
    // }

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
    function mintCGT (address _address) private {
        cariocaGreenTreeToken.safeMint(_address);                
    }

    // Mint tokens RIPTU
    function mintRIPTU (address _address) private {
        rioIPTUToken.mint(_address, creditsPerTree);      
    }

    // Destroy tokens RIPTU
    function destroyRIPTU (address _address) private  {
        rioIPTUToken.burnFromAddress(_address, creditsPerTree);      
    }

    // Transfer tokens RIPTU
    function transferRIPTU (address _address, uint _amount) private  {
        rioIPTUToken.transfer(_address, _amount);
    }

    // Register a new  tree
    function registerTree(address _address) public {
      totalTrees[_address]  += 1;
      totalCredits[_address] += creditsPerTree;

      mintCGT(_address);
      mintRIPTU(_address);

      emit TreeRegistered(_address, totalTrees[msg.sender], totalCredits[msg.sender]);
    }

    // Unregister a tree
    function unregisterTree(address _address) public {
      require(totalTrees[msg.sender] > 0, "Citizen does not have any tree.");

      totalTrees[msg.sender]  -= 1;
      totalCredits[msg.sender] -= creditsPerTree;

      emit TreeUnregistered(_address, totalTrees[msg.sender], totalCredits[msg.sender]);
    }

    // Get total number of  trees
    function getNumTrees(address _address) public view returns (uint){
      return (totalTrees[_address]);
    }

    // Get total number of credits
    function getNumCredits(address _address) public view returns (uint){
      return(totalCredits[_address]);
    }

    // Citizen call this funtion to get his total number of credits
    function transferCredits(address _address, uint _amount) public {
      require(totalCredits[msg.sender] >= _amount, "Citizen does not have enough credits to transfer.");

      totalCredits[msg.sender] -= _amount;
      totalCredits[_address] += _amount;

      transferRIPTU(_address, _amount);
    }
}
