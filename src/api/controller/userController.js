const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const config = require("../../config");
const { errorMessage } = config;

exports.GetAllUsers = (req, res) => {
    try {
        User.find((error, users) => {
            if (!error && users) {
                res.status(200);
                res.json(users);
            }
            else {
                res.status(400);
                console.log(error);
                res.json({ message: "Aucun utilisateur trouvé" });
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.GetAUserById = (req, res) => {
    const { id_user } = req.params;

    try {
        User.findById(id_user, (error, users) => {
            if (!error && users) {
                res.status(200);
                res.json(users);
            } else {
                res.status(400);
                res.json({ message: `L'id de user: ${id_user} est introuvable` });
            }
        })

    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.UserRegister = (req, res) => {
    let new_user = new User(req.body);

    try {
        new_user.save((error, users) => {
            if (!error && users) {
                res.status(201);
                res.json(users);
            }
            else {
                res.status(400);
                console.log(error);
                res.json({ message: "Il manque des infos" });
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
    const { ADMIN_JWT_KEY } = process.env;
    const { GUEST_JWT_KEY } = process.env;

    try {
        User.findOne({ pseudo, password }, (error, users) => {
            if (!error && users) {
                let jwtKey = users.role === "admin" ? ADMIN_JWT_KEY : GUEST_JWT_KEY;
                jwt.sign({ pseudo }, jwtKey, { expiresIn: "10m" }, (error, token) => {
                    if (!error && token) {
                        res.status(200);
                        res.cookie("accessToken", token, { maxAge: 600000, httpOnly: true });
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

exports.UpdateAUserById = (req, res) => {
    const { id_user } = req.params;

    try {
        User.findOneAndUpdate(id_user, req.body, { new: true }, (error, users) => {
            if (!error && users) {
                res.status(200);
                console.log(res);
                res.json(users);
            }
            else {
                res.status(400);
                console.log(error);
                res.json({ message: errorMessage });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.DeleteAUserById = (req, res) => {
    const { id_user } = req.params;

    try {
        User.findByIdAndDelete(id_user, (error, users) => {
            if (!error && users) {
                res.status(200);
                res.json({ message: `La session avec l'id: ${id_user} a été correctement supprimé` });
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de session: ${id_user} est introuvable` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}