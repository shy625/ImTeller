//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ClassicNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _cardIds;

    mapping(uint256 => string) tokenURIs;

    uint256 cost = 10; //민팅비용

    IERC20 public coinContract;

    constructor()  ERC721("TellerCard", "ITC"){
        coinContract = IERC20(0x0c54E456CE9E4501D2c43C38796ce3F06846C966);
    }

    function checkallowance() public view returns (uint256) {
        return coinContract.allowance(msg.sender, address(this));
    }

    function coinBalanceOf() public view returns (uint256){
        return coinContract.balanceOf(msg.sender);
    }

    //tx success 인데 coinAllowance 로 확인해보니까 allowance 값이 변화가 없음.
    function approve() public {
        //coinContract.approve(address(this), cost);
        require(coinContract.approve(address(this), cost),"fail");
    }

    //tx: revert
    function at_transfer() public payable {
        coinContract.approve(address(this), cost);
        coinContract.transferFrom(msg.sender, address(this), cost);
    }

    function t_transfer() public payable  {
        coinContract.transfer(address(this), cost);
    }

    /*
    신규 NFT(ERC - 721) 생성
    @params: 토큰을 받을 주소(to), 그림 URI(_tokenURI)
    @return: 민팅된 카드id(db의 Artid와 불일치, 스마트 컨트랙트 상의 id)
    *warning: 코인 왜 몼쓰는데에에에에
    */
    function createCard(string memory _tokenURI) public payable returns (uint256) {
        address owner = msg.sender;
        //1. 카드 민팅할때 코인 지불 필요

        //2. 민팅
        _cardIds.increment();
        uint256 newCardId = _cardIds.current();
        _mint(owner,  newCardId);
        _setTokenURI(newCardId, _tokenURI);
        return newCardId;
    }

    function current() public view returns (uint256) {
        return Counters.current(_cardIds);
    }

}