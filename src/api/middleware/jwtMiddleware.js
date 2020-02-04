const jwt = require('jsonwebtoken');

const config = require('../../config');
const { errorMessage } = config;

exports.VerifyToken = (req, res, next) => {
    let { accessToken } = req.cookies;

    try {
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_KEY, (error, result) => {
                if (!error && result) {
                    next();
                }
                else {
                    res.status(403);
                    res.json({ message: errorMessage })
                }
            })
        }
        else {
            res.status(403);
            res.json({ message: errorMessage })
        }
    } catch (e) {
        res.status(500);
        res.json({ message: errorMessage })
    }
}