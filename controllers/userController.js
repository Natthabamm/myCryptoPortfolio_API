exports.getMe = (req, res, next) => {
    const { id, username, email } = req.user;
    res
        .status(200)
        .json({
            user: { id, username, email }
        });
};