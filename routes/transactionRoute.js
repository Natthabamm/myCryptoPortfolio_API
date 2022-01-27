const express = require('express');
const authenticate = require('../middlewares/authenticate');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/', authenticate, transactionController.createTransaction);

module.exports = router;
