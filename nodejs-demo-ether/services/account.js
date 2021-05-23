const Web3 = require('web3');
const Contracts = require('../app/contracts.js');
const User = require('../database/models/user.js');
var jwt = require('jsonwebtoken');

account = {
  createAccount: async function (req, res) {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    var web3 = new Web3(provider);
    let password = req.body.password;
    let email = req.body.email;

    const userFromDb = await User.findOne({ email: email });

    if (userFromDb)
      return {
        code: 400,
        error: 'Email existed',
      };

    // let data = await Contracts.web3.eth.personal.newAccount(email + password);
    let data = await web3.eth.personal.newAccount(email + password);
    let unlocked = await web3.eth.personal.unlockAccount(
      data,
      email + password
    );

    // let generatedAccount = await await Contracts.web3.eth.accounts.create();
    let generatedAccount = await web3.eth.accounts.create();
    let publicKey = jwt.sign({ email }, generatedAccount.privateKey, {
      expiresIn: '1d',
    });

    // let privateKey = data.getPrivateKeyString();
    // let address = data.getAddressString();

    return await User.create({
      email,
      password,
      address: data,
      privateKey: generatedAccount.privateKey,
      publicKey,
    });
  },

  generateAccountInNetwork: async function (req, res) {
    let password = req.body.password;
    let email = req.body.email;

    let data = await Contracts.web3.eth.accounts.create();
    return data;
  },

  getBalance: async function (req, resp) {
    let addr = req.body.address;
    let balance = await Contracts.web3.eth.getBalance(addr);
    balance = await Contracts.web3.utils.fromWei(balance, 'ether');
    return {
      addr: addr,
      balance: balance,
    };
  },
  sendEth: async function (req, resp) {
    let srcAddr = req.body.fromAddr;
    let dstAddr = req.body.toAddr;
    let amount = req.body.amount;

    //let amoutStr = amount.toString();
    //convert to eth
    let cvt_amount = await Contracts.web3.utils.toWei(amount, 'ether');

    let objTrans = {
      from: srcAddr,
      to: dstAddr,
      value: cvt_amount,
    };

    let transaction = await Contracts.web3.eth.sendTransaction(objTrans);
    return {
      transaction,
    };
  },
  getByKey: async function (req, res) {
    const type = req.query.type;
    const key = req.params.key;

    const user = await User.findOne({ [`${type}Key`]: key });
    if (!user)
      return {
        code: 404,
        error: 'User is not found',
      };
    return user;
  },
};

module.exports = account;
