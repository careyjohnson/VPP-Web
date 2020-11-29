const db = require('../database/Users');
const User = require('../models/User');
const StatusCodes = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

const configs = require('../configs/AppConfig');

class Users {

    createUser(req, res, next) {
        const { username, password, name, email } = req.body;
        const user = new User(username, password, name, email);
        db.createUser(user).then(() => {
            const secret = configs.TOKEN_SECRET;
            const token = jwt.sign({username: username}, secret).toString();
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(StatusCodes.CREATED).redirect('/');
        })
        .catch((err) => {
            if (err.info.code == 1062) {
                res.status(StatusCodes.OK).json({ 
                    sucess: 'fail', 
                    // Code 1062 for duplicated key
                    code: err.info.code, 
                    message: err.info.msg
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }

    login (req, res, next) {
        const { username, password } = req.query;
        db.checkUser(username, password).then((result) => {
            if (result) {
                const secret = configs.TOKEN_SECRET;
                const token = jwt.sign({username: username}, secret).toString();
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                res.redirect('/');
            }
        })
    }

    logout (req, res, next) {
        const cookies = req.cookies;
        //Clear cookies
        for (let prop in cookies) {
            if (!cookies.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, '', {expires: new Date(0)});
        }
        res.redirect('/');
    }

}

module.exports = new Users();