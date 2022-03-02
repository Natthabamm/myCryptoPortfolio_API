const { Op } = require("sequelize");
const { Transaction } = require("../models");

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });
    console.log(transactions)
    if (!transactions) {
      return res.status(404).json({ message: "transaction not found" });
    }

    res.status(200).json({ transactions });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      return res.status(400).json({ message: "transaction not found" });
    }

    res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const {
      transactionType,
      coinName,
      quanity,
      pricePerCoin,
      date,
      time,
      totalSpent,
      currencies
    } = req.body;

    if (
      !transactionType &&
      !coinName &&
      !quanity &&
      !pricePerCoin &&
      !date &&
      !time &&
      !totalSpent &&
      !currencies
    ) {
      return res.status(400).json({
        message:
          "transaction type or coin name or quanity or datetime or totalspent is required",
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      transactionType,
      coinName,
      quanity,
      pricePerCoin,
      date,
      time,
      totalSpent,
      currencies,
    });

    res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { 
      quanity,
      pricePerCoin,
      date,
      time,
      totalSpent
    } = req.body;
    
    const transaction = await Transaction.update({ 
      quanity,
      pricePerCoin,
      date,
      time,
      totalSpent }, {
      where: {
        [Op.and]: [{ id }, { userId: req.user.id }],
      },
    });


    res.status(200).json({ message: 'update transaction completed', transaction });
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: {
        [Op.and]: [{ id }, { userId: req.user.id }],
      },
    });
    if (!transaction) {
      return res.status(404).json({ message: "transaction not found" });
    }
    await transaction.destroy();

    res.status(204).json({ message: "delete transaction completed" });
  } catch (err) {
    next(err);
  }
};

// feature in the future
exports.deleteTransactionAll = async (req, res, next) => {
  try {
    const { coinName } = req.params;
    console.log(coinName)
    console.log(req.user.id)
    const transaction = await Transaction.findAll({
      where: {
        [Op.and]: [{ coinName }, { userId: req.user.id }],
      },
    });
    if (!transaction) {
      return res.status(404).json({ message: "transaction not found" });
    }
    console.log(transaction)
    await transaction.destroy();

    res.status(204).json({ message: "delete transaction completed" });
  } catch (err) {
    next(err);
  }
};
