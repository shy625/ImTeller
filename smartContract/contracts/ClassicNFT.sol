//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Token.sol";

contract ClassicNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;
    address admin = 0xc37d13B5523C1D80bA15DDFA5Cd3bD1AbB482aaF;

    IERC20 public erc20Contract;
    address private TockenAddress;

    constructor(
        address _currencyAddress
    )  ERC721("TellerCard", "ITC"){
        TockenAddress = _currencyAddress;
        erc20Contract = IERC20(_currencyAddress);
    }

    //신규 ERC-721 토큰을 생성
    //입력: 신규 NFT 카드를 저장할 지갑, , 그림 s3 주소
    //반환: 신규 NFT 카드 식별자(tokenId)
    function create(address to, string memory _tokenURI, uint128 cost) public onlyOwner returns (uint256) {
        //1. 카드 민팅할때 돈 지불 필요
        //토큰이 충분한지 확인
        require(_getCurrencyAmount() >= cost, "You don't have enough token to mint this card");
        //erc20Contract.approve(to, cost);
        //erc20Contract.forcetotransferFrom(to, ownAddress, cost);
        Token(TockenAddress).forceToTransfer(to, admin, cost);

        //2. 민팅
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to,  newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    function forceToTransfer(address from, address to, uint256 cardId) public returns (bool){
        _transfer(from, to, cardId);
        return true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    function current() public view returns (uint256) {
        return Counters.current(_tokenIds);
    }
}