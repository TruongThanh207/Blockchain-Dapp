const Router = require('express').Router;
const authService = require('../services/auth');

const router = new Router();

router.post('/login', async function (req, res) {
  let data = await authService.login(req, res);
  res.json({
    payload: data,
  });
});

router.post('/login-with-address', async function (req, res) {
  let data = await authService.loginWithAddress(req, res);
  res.json({
    payload: data,
  });
});

module.exports = router;
