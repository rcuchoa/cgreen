// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact rcuchoa@gmail.com
contract RioIPTUToken is ERC20, ERC20Pausable, Ownable {
    constructor(address _initialOwner)
        ERC20("Rio IPTU Token", "RIPTU")
        Ownable(_initialOwner) {
            _mint(_initialOwner, 200);
    }

    function decimals() public view virtual override returns (uint8) {
            return 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer (address from, address to, uint256 amount) public onlyOwner {
        transferFrom(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}

