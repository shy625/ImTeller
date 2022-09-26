//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "./ERC20.sol";
//import "./Token.sol";

contract ClassicNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _cardIds;
    mapping(uint256 => string) tokenURIs;
    //address admin = 0xc37d13B5523C1D80bA15DDFA5Cd3bD1AbB482aaF; //민팅비용을 받을 주소
    address admin = 0x44ECF5928CaB651E0D2f0C195076d8F4645D16E6; //account2
    uint8 cost = 5; //민팅비용

    IERC20 public erc20Contract;
    //Token private myToken;
    constructor(
        address _currencyAddress
    )  ERC721("TellerCard", "ITC"){
        //myToken = Token(_currencyAddress);
        erc20Contract = IERC20(_currencyAddress);
    }
    /*
    현재 보유중인 토큰(ERC-20) 갯수 반환
    @params x
    @return: ERC -20 토큰 갯수
    *warning: 직접 사용x
    */
    function getTokenBalance() public view returns (uint256){
        return erc20Contract.balanceOf(msg.sender);
    }

    /*
    신규 NFT(ERC - 721) 생성
    @params: 토큰을 받을 주소(to), 그림 URI(_tokenURI)
    @return: 민팅된 카드id(db의 Artid와 불일치, 스마트 컨트랙트 상의 id)
    *warning: 민팅비용을 ERC-20으로 지급하는 정석 로직 구현하고 싶은데 에러나는 중
    */
    function createStandard(address to, string memory _tokenURI) public payable returns (uint256) {
        //1. 카드 민팅할때 돈 지불 필요
        //토큰이 충분한지 확인
        //require(getTokenBalance() >= cost, "You don't have enough token to mint this card");
        //admin에게 cost 만큼의 ERC20 토큰 허용
        erc20Contract.approve(admin, cost);
        //to에서 cost만큼 ERC-20 토큰을 admin에게 송금
        erc20Contract.transferFrom(to, admin, cost);

        //2. 민팅
        //cardID != DB상의 ArtId
        //스마트컨트랙트 상에서 생성, 저장, 사용되는 id
        _cardIds.increment();
        uint256 newCardId = _cardIds.current();
        _mint(to,  newCardId);
        _setTokenURI(newCardId, _tokenURI);
        return newCardId;
    }

    /*
    신규 NFT(ERC - 721) 생성
    @params: 토큰을 받을 주소(to), 그림 URI(_tokenURI), 민팅비용(cost)
    @return: 민팅된 카드id(db의 Artid와 불일치, 스마트 컨트랙트 상의 id)
    *warning: approval 확인 x 강제 송금
    */
    function forceToCreate(address to, string memory _tokenURI) public payable returns (uint256) {

        //1. 카드 민팅할때 돈 지불 필요
        //토큰이 충분한지 확인
        require(getTokenBalance() >= cost, "You don't have enough token to mint this card");
        //소유권한 체크 없이 강제 송금 함수
        //myToken.forceToTransfer(to, admin, cost);

        //2. 새로운 cardId 생성
        _cardIds.increment();
        uint256 newCardId = _cardIds.current();
        //3. 신규cardId 로 민팅
        _mint(to,  newCardId);
        _setTokenURI(newCardId, _tokenURI);

        return newCardId;
    }

    /*
    NFT(ERC-721) 강제 소유권 이전
    @params: 현재 토큰 소유 주소(from), 토큰을 받을 주소(to), 소유권 바꿀 토큰id(cardId, db-Artid아님)
    @return: bool
    *warning: approved, allowance 확인x 강제 이전
    */
    function forceToTransfer(address from, address to, uint256 cardId) public payable returns (bool){
        _transfer(from, to, cardId);
        return true;
    }

    function current() public view returns (uint256) {
        return Counters.current(_cardIds);
    }
}