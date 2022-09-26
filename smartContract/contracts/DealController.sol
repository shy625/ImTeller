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

    constructor(
        address _currencyAddress,
        address _nftAddress
    ) {
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }
    /*
    신규 거래 생성
    @params: 판매할 NFT(cardId), 입찰최저가격(minPrice), 즉시구매가(purchasePrice), 거래시작시간, 거래종료시간, ERC20 CA, ERC721 CA
    @return: 신규 생성된 거래 CA
    */
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

        //2. 신규 거래 생성
        Deal deal = new Deal(seller, cardId, minPrice, purchasePrice, startTime, endTime, currencyAddress, nftAddress);

        //3. 카드 소유권을 거래인스턴스에게 이전
        //erc721Contract.transferFrom(seller, address(deal), cardId);

        //거래 CA 리스트에 신규 생성된 거래 push
        deals.push(address(deal));

        //신규 거래 생성 event 발생
        emit NewDeal(seller, cardId, purchasePrice);

        //신규 거래 CA 반환
        return address(deal);
    }

    //생성된 모든 거래 CA 반환
    function allDeals() public view returns (address[] memory) {
        return deals;
    }

    /*
    NFT 카드의 현재 보유자 반환
    @params: NFT(cardId)
    @return: 해당 NFT의 현재 보유자 주소
    */
    function findOwner(uint256 cardId) public view returns (address){
        return erc721Contract.ownerOf(cardId);
    }

}
