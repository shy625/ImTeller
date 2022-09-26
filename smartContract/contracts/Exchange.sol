// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Token.sol";
import "./ClassicNFT.sol";

//경매 없이 빠르게 구매만 하는 컨트랙트
//approval, allowance확인 없이 ERC20, ERC721 소유권 이전 실행중
contract Exchange {
    Token private myToken;
    ClassicNFT private myNFT;


    event NewBid(address dealContractAddress, uint cardId, address bidder, uint256 amount);
    event DealCanceled(address dealContractAddress, uint cardId, address seller);
    event DealEnded(address dealContractAddress, uint256 cardId, address buyer, uint256 amount);

    constructor(
        address _currencyAddress,
        address _nftAddress
    ) {
        myToken = Token(_currencyAddress);
        myNFT = ClassicNFT(_nftAddress);
    }
    /*
    토큰(ERC-20)과 NFT(ERC - 721) 거래 실행
    @params: 판매자(to), cardId(cardId), NFT 가격(price)
    @return: none
    *warning: approval, allowance 확인 x 강제 송금
    */
    function closeDeal(address seller, uint256 cardId, uint256 price) public payable{
        //구매자는 함수 호출자
        address buyer=msg.sender;
        //1. 거래성사 조건확인
        //1-1.판매자는 구매를 할 수 없음.
        require(buyer!=seller, "You can't buy your own card");
        //1-2.구매자가 잔고에 즉시구매가만큼 토큰이 있어야됨
        //require(erc20Contract.balanceOf(buyer) >= price, "You don't have enough Tocken to buy this Card");

        //2. ERC20 토큰 소유권이전
        myToken.forceToTransfer(buyer, seller, price);

        //3. ERC721 토큰 소유권이전
        myNFT.forceToTransfer(seller, buyer, cardId);

        emit DealEnded(address(this), cardId, buyer, price);
    }

}


