// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Token.sol";
import "./ClassicNFT.sol";
import "./Deal.sol";

contract DealController is Ownable {

    address[]  public deals;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event NewDeal(address seller, uint256 cardId, uint256 price);
    event DealEnded(address indexed buyer, uint256 purchasePrice);

    constructor(
        address _currencyAddress,
        address _nftAddress
    ) {
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function createDeal(
        uint256 cardId,
        uint256 minPrice,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        address seller = msg.sender;
        //1. 카드 거래 등록 조건
        //거래에 내놓는 카드가 판매자의 것이 맞는지 확인
        require(erc721Contract.ownerOf(cardId) == seller, "Seller is not owner of this Card");
        Deal deal = new Deal(seller, cardId, minPrice, purchasePrice, startTime, endTime, currencyAddress, nftAddress);

        //2. 카드 소유권을 거래인스턴스에게 이전
        //erc721Contract.transferFrom(seller, address(deal), cardId);

        deals.push(address(deal));

        emit NewDeal(seller, cardId, purchasePrice);

        return address(deal);
    }

    function allDeals() public view returns (address[] memory) {
        return deals;
    }

    function findOwner(uint256 cardId) public view returns (address){
        return erc721Contract.ownerOf(cardId);
    }

}
