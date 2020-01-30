const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const hostname = '0.0.0.0';
const port = 3000;

// Connexion BDD
// protocole://service/nom_bdd
mongoose.connect('mongodb://mongo/' + process.env.DB_NAME);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importe la fonction anonyme dans la constante
const moduleRoute = require('./api/route/moduleRoute');
const sessionRoute = require('./api/route/sessionRoute');
const userRoute = require('./api/route/userRoute');
// Utilise la fonction anonyme contenu dans la constante
moduleRoute(app);
sessionRoute(app);
userRoute(app);


app.listen(port, hostname);
