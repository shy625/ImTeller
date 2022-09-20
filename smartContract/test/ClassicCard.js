//NFT 민팅 테스트코드
const ClassicCard = artifacts.require("ClassicNFT(custom)");

contract("ClassicCard", (accounts) => {

    it("NFT mint", async () => {
        const instance = await ClassicCard.deployed();
        const artist = accounts[0];
        const tokenURI="토큰URI";
        const creationDate="날짜";
        const title ="살려줘";
        const description ="솔리디티 근본없어";

        it("Create Test", () => {
            SsafyNFT.deployed()
                .then(instance => {
                    tokenId = instance.createCard(artist, tokenURI, creationDate, title, description);
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