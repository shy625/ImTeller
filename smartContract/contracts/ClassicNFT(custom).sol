// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//ERC 721 - NFT Tocken에 저장될 Metadate Custom
contract ClassicNFT is ERC721Enumerable {
    using Counters for Counters.Counter;

    //NFT생성 시 ID 1씩 증가
    Counters.Counter private _tokenIds;
    //NFT 메타데이터 URI 저장을 위한 mapping
    mapping(uint256 => string) tokenURIs;

    //그림그린사람
    mapping(uint256 => address) private _artist;
    //NFT 생성 날짜 creationDate
    mapping(uint256 => string) private _creationDate;
    //카드 제목 title
    mapping(uint256 => string) private _title;
     //카드 설명 description
    mapping(uint256 => string) private _description;


    constructor(string memory _name, string memory _symbol)  ERC721("ClassicCard", ""){
    }

    /*
    신규 ERC-721 토큰을 생성
    입력: 신규 NFT 카드를 저장할 지갑주소, 카드uri
    반환: 신규 NFT 카드 식별자
    */
    function createCard(
        address to,
        string memory _tokenURI,
        string _artist,
        string _creationDate,
        string _title,
        string _description
        ) public returns (uint256) {
        //토큰 ID +1
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setArtist(newTokenId, msg.sender);
        _setCreationDate(newTokenId);
        _setTitle(newTokenId, title);
        _setDescription(newTokenId, description);

        return newTokenId;
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

   // ERC721URIStorage: TokenURI setter
    function _setTokenURI(
            uint256 tokenId,
            string memory _tokenURI
        ) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setArtist(
            uint256 tokenId,
            address artist
        ) private {
        _artists[tokenId] = artist;
    }

    function _setCreationDate(
            uint256 tokenId,
            string creationDate
        ) private {
        _creationDates[tokenId] = creationDate;
    }

    function _setTitle(
            uint256 tokenId,
            string title
        ) private {
        _titles[tokenId] = title;
    }

    function _setDescription(
            uint256 tokenId,
            string description
        ) private {
        _descriptions[tokenId] = description;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getArtist(uint256 tokenId) public view returns (address) {
        return _artists[tokenId];
    }

    function getCreationDate(uint256 tokenId) public view returns (uint256) {
        return _creationDates[tokenId];
    }

    function getTitle(uint256 tokenId) public view returns (string) {
        return _titles[tokenId];
    }

    function getDescription(uint256 tokenId) public view returns (string) {
        return _descriptions[tokenId];
    }

}