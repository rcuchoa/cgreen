// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CariocaGreenTreeToken.sol";
import "./RioIPTUToken.sol";

contract CariocaGreenSC is Ownable {

    uint256 public numRIPTUperTree;                         // Número de tokens RIPTU por cada árvore plantada
    CariocaGreenTreeToken public cariocaGreenTreeToken;     // Referência ao SC CariocaGreenTreeToken
    RioIPTUToken public rioIPTUToken;                       // Referência ao SC RioIPTUToken

    event CariocaGreenSCCreated(address indexed owner);
    constructor(address initialOwner, uint256 amount) 
        Ownable(initialOwner) {
        numRIPTUperTree = amount;
        cariocaGreenTreeToken = new CariocaGreenTreeToken(initialOwner);
        rioIPTUToken = new RioIPTUToken(initialOwner);
        emit CariocaGreenSCCreated(initialOwner);
    }

    function geraCreditosIPTU (address to) public onlyOwner {
        cariocaGreenTreeToken.safeMint(to);                // Gera uma token NFT CGT para registro da árvore
        rioIPTUToken.mint(to, numRIPTUperTree);            // Gera um conjunto de tokens RIPTU para registro dos créditos
    }

    function transferCreditosIPTU (address from, address to, uint256 amount) public onlyOwner {
        rioIPTUToken.transfer(from, to, amount);
    }

    function balanceOf (address wallet) public onlyOwner {
        return this.balanceOf(wallet);
    }
}
