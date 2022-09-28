//import
import { web3, coinContract, cardContract, marketContract } from "./ABI";
import dealABI from "./DealABI";

//mint
export const createCard = async()=>{
    const admin = 0x3f317D1680B8B60da4323bbB1328a8F0DD44edfb;
    const wallet = "wallet은 유저의 account Address";
    const tokenURI = "그림 url";

    const approvalToPay = await coinContract.methods
    .approve(admin, 10)
    .send({from: wallet});
    if(approvalToPay.status){
        return await cardContract.methods
        .create(tokenURI)
        .send({from: wallet});
        //이렇게 하면 return되는 값에 tokenId 오는건가???
    };
}

//new Deal
export const sellCard = async () => {

  const wallet = "wallet은 유저의 account Address";
  const tokenURL ="판매할 카드 url"
  const tokenId = "판매할 카드의 token Id";
  const price ="판매가격";

  const dealCA = await marketContract.methods
  .createDeal(tokenURL, price)
  .send({from: wallet})

  await cardContract.methods
  .setApprovalForAll(dealCA, true)
  .send({from: wallet})

  await cardContract.methods
  .transferFrom(wallet, dealCA, tokenId)
  .send({from: wallet})

};


//Card 구매
export const purchaseCard = async () => {
    const dealCA ="내가 살 카드의 거래 CA";
    const dealInstance = new web3.eth.Contract(dealABI, dealCA);
    const wallet = "wallet은 유저의 account Address";
    const price = "해당 카드 가격"
    const approvalToPay = await coinContract.methods
    .approve(dealCA, price)
    .send({from: wallet});
    if(approvalToPay.status){
      return await dealInstance.methods
      .purchase()
      .send({from: wallet});
    };

  };


//판매 취소
export const cancelDeal = async () => {
  const dealCA ="내가 살 카드의 거래 CA";
  const dealInstance = new web3.eth.Contract(dealABI, dealCA);
  const wallet = "wallet은 유저의 account Address";

    return await dealInstance.methods
    .cancelDeal()
    .send({ from: wallet});
  };