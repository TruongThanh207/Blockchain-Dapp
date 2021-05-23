const Web3 = require('web3');
const Contracts = require('../app/contracts.js');
const User = require('../database/models/user');
var jwt = require('jsonwebtoken');
const accountService = require('./account.js');

const auth = {
  login: async function (req, res) {
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    var web3 = new Web3(provider);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user)
      return {
        code: 404,
        error: 'User is not found',
      };

    if (user.password !== password) {
      return {
        code: 400,
        error: 'Email or Password is not correct',
      };
    }

    let data = await web3.eth.personal.newAccount(email + password);
    let unlocked = await web3.eth.personal.unlockAccount(
      data,
      email + password
    );

    return {
      access_token: user.publicKey,
      address: data,
    };
  },
  loginWithAddress: async function (req, res) {
    const address = req.body.address;

    const valid = await Contracts.web3.utils.isAddress(address);
    if (!valid)
      return {
        code: 400,
        error: 'Address wrong',
      };

    let publicKey = jwt.sign({ address }, address, {
      expiresIn: '1d',
    });

    // const accounts = await Contracts.web3.eth.getAccounts();
    // const existed = accounts.find((acc) => acc === address);
    // if (existed === -1)
    //   return {
    //     code: 404,
    //     error: 'Address is not found',
    //   };
    return {
      access_token: publicKey,
      address,
    };
  },
};
module.exports = auth;
