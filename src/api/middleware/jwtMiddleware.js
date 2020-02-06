const jwt = require("jsonwebtoken");

const config = require("../../config");
const { errorMessage } = config;

const { ADMIN_JWT_KEY } = process.env;
const { GUEST_JWT_KEY } = process.env;

exports.VerifyAdminToken = (req, res, next) => {
    let { accessToken } = req.cookies;

    try {
        if (accessToken) {
            jwt.verify(accessToken, ADMIN_JWT_KEY, (error, result) => {
                if (!error && result) {
                    next();
                }
                else {
                    res.status(403);
                    res.json({ message: "Vous n'avez pas les autorisations nécessaire pour exécuter cette action" });
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


exports.VerifyGuestToken = (req, res, next) => {
    let { accessToken } = req.cookies;

    try {
        if (accessToken) {
            jwt.verify(accessToken, GUEST_JWT_KEY, (error, result) => {
                if (!error && result) {
                    next();
                }
                else {
                    res.status(403);
                    res.json({ message: "Vous n'avez pas les autorisations nécessaire pour exécuter cette action" })
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

exports.VerifyAdminOrGuestToken = (req, res, next) => {
    let { accessToken } = req.cookies;

    try {
        if (accessToken) {
            jwt.verify(accessToken, GUEST_JWT_KEY, (error, result) => {
                if (!error && result) {
                    next();
                }
                else {
                    jwt.verify(accessToken, ADMIN_JWT_KEY, (error, result) => {
                        if (!error && result) {
                            next();
                        }
                        else {
                            res.status(403);
                            res.json({ message: "Vous n'avez pas les autorisations pour exécuter cette action" });
                        }
                    })
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