//NFT 민팅 테스트코드
const ClassicCard = artifacts.require("ClassicNFT");

contract("ClassicCard", (accounts) => {

    it("NFT mint", async () => {
        const instance = await ClassicCard.deployed();
        const artist = accounts[0];
        const tokenURI="토큰URI";

        it("Create Test", () => {
            SsafyNFT.deployed()
                .then(instance => {
                    tokenId = instance.createCard(artist, tokenURI);
                    owner = sender;
                    instance.current()
                        .then(tokenid => console.log(tokenid))
                })
        });

        it("Transfer Test", () => {
            SsafyNFT.deployed()
                .then(instance => {
                    assert.notEqual(owner, receiver, "NFT transfer Failed!");
                    instance.transferFrom(owner, receiver, tokenId);
                    owner = receiver;
                })
        });

        it("Compare tokenURI", () => {
            SsafyNFT.deployed()
                .then(instance => {
                    const tokenURIFetched = instance.tokenURI(tokenId);
                    // console.log(tokenURIFetched);
                    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI")
                })
        });
    });
});