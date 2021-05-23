const Router = require('express').Router;
const walletService = require('../services/wallet');

const router = new Router();

router.post('/add', async function (req, res) {
  let data = await walletService.addToWallet(req, res);
  res.json({
    payload: data,
  });
});

router.get('s', async function (req, res) {
  let data = await walletService.getWallet(req, res);
  res.json({
    payload: data,
  });
});

module.exports = router;
