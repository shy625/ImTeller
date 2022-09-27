//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract ClassicNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _cardIds;

    mapping(uint256 => string) tokenURIs;

    address admin = 0x44ECF5928CaB651E0D2f0C195076d8F4645D16E6; //account2
    uint8 cost = 5; //민팅비용

    constructor()  ERC721("TellerCard", "ITC"){
    }

    function createCard(string memory _tokenURI) public payable returns (uint256) {
        address owner = msg.sender;


        _cardIds.increment();
        uint256 newCardId = _cardIds.current();
        _mint(owner,  newCardId);
        _setTokenURI(newCardId, _tokenURI);
        return newCardId;
    }

    function current() public view returns (uint256) {
        return Counters.current(_cardIds);
    }
}