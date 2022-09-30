// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20//IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

//v.5
contract Market is Ownable {
    IERC721 public cardContract;
    IERC20 public coinContract;
    address private cardCA;

    event NewDeal(address seller, uint256 cardId, uint256 price);
    event checkAddress(address CA);

    constructor(address _cardAddress) {
        coinContract = IERC20(0x0c54E456CE9E4501D2c43C38796ce3F06846C966);
        cardContract = IERC721(_cardAddress);
        cardCA = _cardAddress;
    }

    /*
    @params cardId- db의 token_id, price - 판매가격
    @return 신규생성된 거래CA
    warning: 거래 생성 후에 프론트에서 return 받은 address에 card 소유권 권한 부여 setapproval 필요.
    */
    function createDeal(uint256 _cardId, uint256 _price)
        public
        payable
        returns (address)
    {
        address seller = msg.sender;
        require(
            cardContract.ownerOf(_cardId) == seller,
            "You are not an owner of this card"
        );

        Deal deal = new Deal(seller, _cardId, _price, cardCA);
        emit NewDeal(seller, _cardId, _price);
        emit checkAddress(address(deal));

        return address(deal);
    }
}

contract Deal {
    address private seller;
    uint256 private cardId;
    uint256 private price;
    bool private dealState;

    IERC20 public coinContract;
    IERC721 public cardContract;

    event DealCanceled(address dealCA, uint cardId, address seller);
    event DealEnded(
        address dealCA,
        uint256 cardId,
        address buyer,
        uint256 amount
    );

    constructor(
        address _seller,
        uint256 _cardId,
        uint256 _price,
        address _cardAddress
    ) {
        cardContract = IERC721(_cardAddress);
        coinContract = IERC20(0x0c54E456CE9E4501D2c43C38796ce3F06846C966);
        dealState = true;
        cardId = _cardId;
        price = _price;
        seller = _seller;
    }

    /*
    카드 구매
    warning: 함수 호출 전에 IERC20.approve로 코인송금 권한 부여 필요
    */
    function purchase() public payable duringDeal returns (uint256) {
        address buyer = msg.sender;

        //0.거래조건 확인
        require(seller != buyer, "You can't buy your own Card");

        //1.SSF 송금
        coinContract.transferFrom(buyer, seller, price);

        //2. NFT 소유권 이전
        cardContract.transferFrom(seller, address(this), cardId);
        cardContract.transferFrom(address(this), buyer, cardId);

        //3. 거래 종료
        dealState = false;

        emit DealEnded(address(this), cardId, buyer, price);

        return cardId;
    }

    function cancelDeal() public payable duringDeal onlySeller returns (bool) {
        //거래에게 준 권한 취소
        cardContract.setApprovalForAll(address(this), false);

        //판매 상태를 완료로 전환
        dealState = false;
        emit DealCanceled(address(this), cardId, seller);
        return true;
    }

    modifier duringDeal() {
        require(dealState, "Deal is not available");
        _;
    }
    modifier onlySeller() {
        require(msg.sender == seller, "Deal: You are not seller.");
        _;
    }
}
