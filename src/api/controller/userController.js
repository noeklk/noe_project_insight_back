const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const config = require('../../config');
const { errorMessage } = config;

exports.UserRegister = (req, res) => {
    let new_user = new User(req.body);

    try {
        new_user.save((error, user) => {
            if (!error) {
                res.status(201);
                res.json(user);
            }
            else {
                res.status(400);
                console.log(error);
                res.json({ message: 'Il manque des infos' });
            }
        })
    }
    catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}


exports.UserLogin = (req, res) => {
    const { pseudo } = req.body;
    const { password } = req.body;

    try {

        User.find({ pseudo, password }, (error, user) => {
            if (!error & user.length) {
                jwt.sign({ pseudo }, process.env.JWT_KEY, { expiresIn: '10m' }, (error, token) => {

                    if (!error) {
                        res.status(200);
                        console.log(res);
                        res.json({ token });
                    }
                    else {
                        res.status(500);
                        console.log(error);
                        res.json({ message: errorMessage });
                    }
                });
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'utilisateur avec le pseudo: '${pseudo}' n'existe pas ou le mot de passe est incorrecte` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}