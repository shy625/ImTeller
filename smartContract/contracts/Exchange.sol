// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Token.sol";
import "./ClassicNFT.sol";

//경매 없이 빠르게 구매만 하는 컨트랙트
contract Exchange {

    IERC20 public erc20Contract;
    address private TockenAddress;
    address private NFTAddress;

    event NewBid(address dealContractAddress, uint cardId, address bidder, uint256 amount);
    event DealCanceled(address dealContractAddress, uint cardId, address seller);
    event DealEnded(address dealContractAddress, uint256 cardId, address buyer, uint256 amount);

    constructor(
        address _currencyAddress,
        address _nftAddress
    ) {

        erc20Contract = IERC20(_currencyAddress);
        TockenAddress = _currencyAddress;
        NFTAddress = _nftAddress;
    }

    function buy(address seller, uint256 cardId, uint256 price) public payable duringDeal{
        //구매자는 함수 호출자
        buyer=msg.sender;
        //판매자는 구매를 할 수 없음.
        require(buyer!=seller, "You can't buy your own card");
        //구매자가 잔고에 즉시구매가만큼 토큰이 있어야됨
        require(erc20Contract.balanceOf(buyer) >= price, "You don't have enough Tocken to buy this Card");

        Token(TockenAddress).forceToTransfer(buyer, seller, price);
        ClassicNFT(NFTAddress).forceToTransfer(seller, buyer, cardId);
        emit DealEnded(address(this), cardId, buyer, price);
    }

}


