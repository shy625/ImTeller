//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable{
    constructor() ERC20("Token", "SSF") {}
    //constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol, decimal) {}

    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }

    function forceToTransfer(address from, address to, uint256 amount) public{
        _transfer(from, to, amount);
    }

}