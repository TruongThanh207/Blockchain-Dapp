const Router = require('express').Router;
const accountRouter = require('./account');
const walletRouter = require('./wallet');
const storageRouter = require('./storage');
const authRouter = require('./auth');

const router = new Router();

router.use('/account', accountRouter);
router.use('/wallet', walletRouter);
router.use('/auth', authRouter);
router.use('/storage', storageRouter);

module.exports = router;
