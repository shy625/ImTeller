const Token = artifacts.require("Token");
const ClassicNFT = artifacts.require("ClassicNFT");
const DealController = artifacts.require("DealController");
const Deal = artifacts.require("Deal");
const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {
  deployer.deploy(Token);
  deployer.deploy(ClassicNFT, Token.address);
  deployer.deploy(DealController, Token.address, ClassicNFT.address );
  deployer.deploy(Exchange, Token.address, ClassicNFT.address );
};
