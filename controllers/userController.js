const res = require('express/lib/response');
const fs = require('fs');
const { User } = require('../models');

exports.getMe = (req, res, next) => {
    const { id, username, email } = req.body;
    res
        .status(200)
        .json({
            user: { id, username, email }
        })
};