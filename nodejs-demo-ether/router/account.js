const Router = require('express').Router;
const accountService = require('../services/account');
const Contracts = require('../app/contracts.js');


const router = new Router();

router.get('/all', function (req, res) {
  Contracts.web3.eth.getAccounts(function (err, accounts) {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json({
      accounts: accounts,
    });
  });
});

router.post('/create', async function (req, res) {
  let data = await accountService.createAccount(req, res);
  res.json({
    payload: data,
  });
});

router.post('/generate', async function (req, res) {
  let data = await accountService.generateAccountInNetwork(req, res);
  res.json({
    payload: data,
  });
});

//
router.post('/get-balance', async function (req, res) {
  let data = await accountService.getBalance(req, res);
  res.json({
    payload: data,
  });
});

router.post('/send-eth', async function (req, res) {
  let transaction = await accountService.sendEth(req, res);
  res.json({
    payload: transaction,
  });
});

router.get('/:key', async function (req, res) {
  let user = await accountService.getByKey(req, res);
  res.json({
    payload: user,
  });
});

module.exports = router;
