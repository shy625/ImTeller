//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable{

    //@openzeppelin으로 ERC20을 import하는 경우 decimal 설정이 불가능하고 기본값 16으로 설정돔.
    //construct에서 dedimal 설정이 가능하게 따로 ERC20.sol 작성 후 import
    constructor (string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol, decimal) {}

    /*
    토큰(ERC-20) 생성
    @params 발급한 토큰(ERC-20) 갯수
    @return none
    *warning: CA만 생성가능
    */
    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }
    /*
    현재 보유중인 토큰(ERC-20) 송금
    @params: 현재 토큰 보유 주소(from), 토큰 받을 주소(to), 송금할 토큰(ERC20)의 양
    @return: none
    *warning: approve확인 없이 강제송금
    */
    function forceToTransfer(address from, address to, uint256 amount) public{
        _transfer(from, to, amount);
    }

    function giveAllowance(address from, address to, uint256 amount) public returns (uint256){
        approve(to, amount);
        return allowance(from, to);
    }

}