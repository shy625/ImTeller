// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract DealFactory is Ownable, IERC721Receiver {
    address public admin;
    address[] public deals;

    event NewDeal(
        address indexed _dealContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }
    //신규거래 contract 생성
    function createDeal(
        uint256 tokenId, 
        uint256 minPrice, 
        uint256 purchasePrice, 
        uint256 startTime, 
        uint256 endTime, 
        address currencyAddress, 
        address nftAddress 
    ) public returns (address) {
        Deal newContract = new Deal(admin, seller, itemId, purchasePrice, currencyAddress, nftAddress);
        emit NewDeal(newContract.getAddress(), newContract.getSeller(), newContract.gettokenId());
        deals.push(newContract.getAddress());
        return newContract.getAddress();
    }

    function allDeals() public view returns (address[] memory) {
        return deals;
    }
}


contract Deal {

    address public seller; 
    address public buyer;
    address admin;
    uint256 public dealStartTime;//경매시작시간
    uint256 public dealEndTime;//경매종료시간
    uint256 public minPrice;//최소입찰가
    uint256 public purchasePrice;//즉시구매가
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended; //거래종료여부

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event HighestBidIncereased(address bidder, uint256 amount);
    event DealEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        dealStartTime = startTime;
        dealEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount) public {

    }

    function purchase() public {
        buyer = msg.sender;
        require(buyer != seller); 

        //거래전에 잔액이 최종입찰가보다 많은지 확인
        require(_getCurrencyAmount >= classPrice, "balance is exhausted");

        erc20Contract.approve(buyer, purchasePrice);
        erc20Contract.transferFrom(buyer, seller, purchasePrice); // 구매자의 토큰을 즉시구매가만큼 판매자에게 송금

        erc721Contract.setApprovalForAll(seller, true);
        erc721Contract.approve(buyer, tokenId);
        erc721Contract.transferFrom(seller, buyer, tokenId); // NFT소유권을 구매자에게 이전
        seller = buyer;
        buyer = address(0);
        ended = true;// 거래완료 상태로 변경
    }

    function confirmItem() public {
        // TODO
    }

    function cancelDeals() public {
        require(msg.sender == admin || msg.sender == seller);
        //거래상태를 완료로 바꿈으로써 해당 거래를 취소
        ended = true;
    }

    function cancelBid() public {
        // TODO
    }
    //판매 종료까지 남은 시간을 반환
    function getTimeLeft() public view returns (int256) {
        require(dealEndTime > block.timestamp, "This sale is already ended");
        return (int256)(dealEndTime - block.timestamp);
    }

    function getDealInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            dealStartTime,
            dealEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(
            block.timestamp >= saleStartTime,
            "Deal: This deal is not started."
        );
        _;
    }
}

