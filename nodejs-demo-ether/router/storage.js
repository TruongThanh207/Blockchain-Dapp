const Router = require('express').Router;
const Contracts = require('../app/contracts.js');
const accountService = require('../services/account');

const router = new Router();

router.get('', function (req, res) {
  Contracts.SimpleStorage.deployed().then(function (instance) {
    instance.get.call().then(function (value) {
      res.json({
        value: value,
      });
    });
  });
});

// Set storage contract value
router.post('', function (req, res) {
  var value = req.body.value;
  Contracts.SimpleStorage.deployed().then(function (instance) {
    instance.set(value, { from: Contracts.accounts[0] }).then(function (tx) {
      res.json({
        transaction: tx,
      });
    });
  });
});

module.exports = router;
