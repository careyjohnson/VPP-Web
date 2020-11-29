const jwt = require('jsonwebtoken');
const secret = require('../configs/AppConfig').TOKEN_SECRET;
const StatusCodes = require('http-status-codes').StatusCodes;

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(StatusCodes.UNAUTHORIZED);
        next();
        return;
    }
    
    try {
        const decodedToken = jwt.verify(token, secret);
        if (!decodedToken) {
            const error = new Error('User not authenticated');
            res.status(StatusCodes.UNAUTHORIZED);
            next();
            return
        }
        req.userId = decodedToken._id;
        req.userName = decodedToken.userName;
        next();
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.text(err);
        return;
    }
}