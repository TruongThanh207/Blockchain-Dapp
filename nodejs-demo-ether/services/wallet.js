const Web3 = require('web3');
const Contracts = require('../app/contracts.js');
var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
var web3 = new Web3(provider);

wallet = {
  addToWallet: async function (req, res) {
    let address = req.body.address;

    // let data = await Contracts.web3.eth.personal.newAccount(email + password);
    let generatedAccount = await await web3.eth.accounts.create();
    let data = await web3.eth.accounts.wallet.add(generatedAccount);
    return data;
  },
  getWallet: async function (req, res) {
    let data = await web3.eth.accounts.wallet;
    console.log('getWallet:function ~ data', data);
    return;
  },
};
module.exports = wallet;
