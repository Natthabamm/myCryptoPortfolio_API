const fa = require("fs");
const { Op } = require("sequelize");
const { Transaction, User, sequelize } = require("../models");

exports.createTransaction = async (req, res, next) => {
  try {
    const { transactionType, coinName, quanity, pricePerCoin, date, time, totalSpent, currency  } =
      req.body;
      console.log(req.body)
    if (!transactionType && !coinName && !quanity && !pricePerCoin  && !date && !time && !totalSpent && !currency ) {
      return res
        .status(400)
        .json({
          message:
            "transaction type or coin name or quanity or datetime or totalspent is required",
        });
    };

    const transaction = await Transaction.create({
        userId: req.user.id,
        transactionType,
        coinName,
        quanity,
        pricePerCoin,
        date,
        time,
        totalSpent,
        currency
    })

    res.status(201).json({ transaction });
  } catch (err) {
    next(err);
  }
};


