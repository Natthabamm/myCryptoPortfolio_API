const express = require('express');
const authenticate = require('../middlewares/authenticate');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/:id', authenticate, transactionController.getTransactionById);
router.get('/', authenticate, transactionController.getAllTransactions);
router.post('/', authenticate, transactionController.createTransaction);
router.patch('/:id', authenticate, transactionController.updateTransaction);
router.delete('/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
