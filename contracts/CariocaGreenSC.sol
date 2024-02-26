// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CariocaGreenTreeToken.sol";
import "./RioIPTUToken.sol";

contract CariocaGreenSC is Ownable {
    address public ownerAddress;
    CariocaGreenTreeToken public cariocaGreenTreeToken;
    RioIPTUToken public rioIPTUToken;

    event CariocaGreenSCCreated(address indexed user);

    constructor(address _initialOwner) 
        Ownable(_initialOwner){
        ownerAddress = _initialOwner;
        cariocaGreenTreeToken = new CariocaGreenTreeToken(_initialOwner);
        rioIPTUToken = new RioIPTUToken(_initialOwner);
        emit CariocaGreenSCCreated(_initialOwner);
    }

    function mintGreenTreeToken(address _to) public onlyOwner {
        cariocaGreenTreeToken.safeMint(_to);
    }
}
