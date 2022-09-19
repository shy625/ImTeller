// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//그림을 NFT카드로 민팅(ERC 721)
contract ClassicNFT is ERC721{

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor(string memory _name, string memory _symbol)  ERC721("classic", ""){
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
       return tokenURIs[tokenId];
    }
    //신규 ERC-721 토큰을 생성
    //입력: 신규 NFT 카드를 저장한 지갑, 
    //반환: 신규 NFT 카드 식별자
    function create(address to, string memory _tokenURI) public returns (uint256) {
         _tokenIds += 1;
        _mint(to, _tokenURI);
        tokenURIs[_tokenIds] = _tokenURI;
        return _tokenIds;
    }
}