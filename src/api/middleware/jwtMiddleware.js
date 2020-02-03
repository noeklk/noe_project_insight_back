const jwt = require('jsonwebtoken');

exports.VerifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (error, result) => {
            if (!error && result) {
                next();
            }
            else {
                res.status(403);
                res.json({ message: 'Accès refusé' })
            }
        })
    }
    else {
        res.status(403);
        res.json({ message: 'Accès refusé' })
    }
}