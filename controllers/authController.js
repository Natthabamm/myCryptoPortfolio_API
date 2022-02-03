const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
emailFormat.test('john@gmail.com');

exports.register = async (req, res, next) => {
    try {
        const {
            username,
            email,
            password,
            confirmPassword
        } = req.body;
        console.log(req.body)
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: 'password and confirm password did not match' });
        };

        const isEmail = emailFormat.test(email);
        console.log(isEmail);
        if (isEmail) {
            const existUser = await User.findOne({
                where: { email: email }
            });
            if (existUser) {
                return res
                    .status(400)
                    .json({ message: 'this email is already in use' })
            }
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        await User.create({ 
            username, 
            email: isEmail ? email : null,
            password: hashedPassword
        });

        res.status(201).json({ message: 'user register successfully' })
        
    } catch (err) {
        next(err);
    }

};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isEmail = emailFormat.test(email);
        let user;
        if (isEmail) {
            user = await User.findOne({  
                where: {
                    email: email
                } 
            });
        }

        if (!user) {
            return res
                .status(400)
                .json({ message: 'invalid email or password' })
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'invalid email or password' });
        };
        
        const payload = {
            id: user.id,
            username: user.username,
            
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24* 30 });

        const { id, username } = user;

        res.status(200).json({
            token,
            user: { id, username, email }
        });
    } catch (err) {
        next(err);
    }
};
