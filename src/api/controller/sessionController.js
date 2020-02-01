// src/api/controllers/postController.js
const Session = require('../model/sessionModel');
const errorMessage = 'Erreur Serveur';

exports.CreateASession = (req, res) => {
  const new_session = new Session(req.body);

  try {
    new_session.save((error, sessions) => {
      if (sessions) {
        res.status(201);
        res.json(sessions);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: 'Il manque des infos' });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetAllSessions = (req, res) => {
  try {
    Session.find({}, (error, sessions) => {
      if (sessions) {
        res.status(200);
        res.json(sessions);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: 'Aucune session trouvé' })
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetASessionById = (req, res) => {
  const { id_session } = req.params;

  try {
    Session.findById(id_session, (error, sessions) => {
      if (sessions) {
        res.status(200);
        res.json(sessions);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id de session: ${id_session} est introuvable` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.UpdateASessionById = (req, res) => {
  const { id_session } = req.params;
  try {
    Session.findByIdAndUpdate(id_session, req.body, { new: true }, (error, sessions) => {
      if (sessions) {
        res.status(200);
        res.json(sessions);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id session: ${id_session} est introuvable` })
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.DeleteASessionById = (req, res) => {
  const { id_session } = req.params;
  try {
    Session.findByIdAndRemove(id_session, (error, sessions) => {
      if (sessions) {
        res.status(200);
        res.json({ message: `La session avec l'id: ${id_session} a été correctement supprimé` });
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id de session: ${id_session} est introuvable` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};
