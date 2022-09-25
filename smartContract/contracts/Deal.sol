// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Token.sol";
import "./ClassicNFT.sol";

contract Deal {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    uint256 public dealStartTime;
    uint256 public dealEndTime;
    uint256 public minPrice;
    uint256 public purchasePrice;
    uint256 public cardId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;
    address private TockenAddress;
    address private NFTAddress;

    event NewBid(address dealContractAddress, uint cardId, address bidder, uint256 amount);
    event DealCanceled(address dealContractAddress, uint cardId, address seller);
    event DealEnded(address dealContractAddress, uint256 cardId, address buyer, uint256 amount);

    constructor(
        address _seller,
        uint256 _cardId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        cardId = _cardId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        dealStartTime = startTime;
        dealEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        highestBid=0;
        highestBidder=address(0);
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
        TockenAddress = _currencyAddress;
        NFTAddress = _nftAddress;
    }


    function bid(uint256 amount) public  duringDeal returns (bool){
        address bidder = msg.sender;

        require(erc20Contract.balanceOf(bidder) >= amount, "Bidder have not enough Token");
        require(erc20Contract.approve(bidder, amount), "Not approved for ERC20");
        require(amount >= minPrice, "Your bid is lower than MinPrice");
        require(amount > highestBid, "Your bid is lower than HighestBid");
        require(amount < purchasePrice, "Your bid have to lower than Purchase Price");

        // 새로운 Highet bidder 등장에 따른 기존의 Highet bidder 환불
        if (highestBidder != address(0)) {
            //erc20Contract.approve(address(this), highestBid);
            //erc20Contract.transferFrom(address(this), highestBidder, highestBid);
            Token(TockenAddress).forceToTransfer(address(this), highestBidder, highestBid);
        }

        //bidder contract 로 송금
        //erc20Contract.transferFrom(bidder, address(this), amount);
        Token(TockenAddress).forceToTransfer(bidder, address(this), amount);

        //최고입찰가, 입찰가 정보 업데이트
        highestBid = amount;
        highestBidder = bidder;

        emit NewBid(address(this), cardId, highestBidder, highestBid);

        return true;
    }

    //즉시구매
    function purchase() public payable duringDeal{
        //구매자는 함수 호출자
        buyer=msg.sender;
        //판매자는 구매를 할 수 없음.
        require(buyer!=seller, "You can't buy your own card");
        //구매자가 잔고에 즉시구매가만큼 토큰이 있어야됨
        require(erc20Contract.balanceOf(buyer) >= purchasePrice, "You don't have enough Tocken to buy this Card");

        //1. 최고입찰자가 존재하는 경우 ERC20 토큰 환불진행
        if(highestBidder!=address(0)){
            //erc20Contract.approve(address(this), highestBid);
            //erc20Contract.transferFrom(address(this), highestBidder, highestBid);
            Token(TockenAddress).forceToTransfer(address(this), highestBidder, highestBid);
        }
        //2. 구매자의 ERC20 토큰을 판매자에게 송금, 즉시구매가
        //erc20Contract.transferFrom(buyer, seller, purchasePrice);
        Token(TockenAddress).forceToTransfer(buyer, seller, purchasePrice);

        //3. 판매자의 NFT를 구매자에게 소유권 이전
        // erc721Contract.approve(buyer, cardId);
        // erc721Contract.transferFrom(address(this), buyer, cardId);
        //소유권, 권한 수정하면서 이전시켜야되는데 그거 잘 안되서 일단 강제 이전시킴
        ClassicNFT(NFTAddress).forceToTransfer(seller, buyer, cardId);

        //거래상태 종료로 변경
        _end();

        //거래 정보 표시
        emit DealEnded(address(this), cardId, buyer, purchasePrice);
    }


    //경매시간종료 후 최고 입찰자가 거래 실행
    function confirmItem() public onlyAfterEnd {
        buyer=msg.sender;
        require(buyer == highestBidder || buyer == seller, "caller is not highestBidder or seller");
        Token(TockenAddress).forceToTransfer(address(this), highestBidder, highestBid);
        ClassicNFT(NFTAddress).forceToTransfer(seller, buyer, cardId);
        emit DealEnded(address(this), cardId, buyer, highestBid);
        _end();
    }

    //판매자가 판매를 취소
    function cancelDeal() public onlySeller{
        //경매참여자 있으면 최고입찰자에게 해당 금액 환불
        if(highestBidder!=address(0)){
            erc20Contract.approve(address(this), highestBid);
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }
        //카드 소유권을 다시 판매자에게 반환
        //trial_1: 소유권 이전 권한 부여 : fail 이거자체가 새로운 에러 발생시키는중...
        //erc721Contract.setApprovalForAll(address(this), true);
        //trial_2: safetransferFrom -> transferFrom 으로 변경
        //erc721Contract.transferFrom(address(this), seller, cardId);
        //판매 상태를 완료로 전환
        _end();
        emit DealCanceled(address(this), cardId, seller);
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(dealEndTime - block.timestamp);
    }

    function balanceOf() public view returns(uint256) {
        return erc20Contract.balanceOf(address(this));
    }


    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Deal: You are not seller.");
        _;
    }

    modifier duringDeal() {
        require(block.timestamp >= dealStartTime,"Deal: This sale is not started.");
        require( !ended, "Deal: This sale is already Ended.");
        _;
    }

    modifier onlyAfterEnd() {
        require(
            block.timestamp > dealEndTime,
            "Sale: This sale is not started."
        );
        _;
    }
}


