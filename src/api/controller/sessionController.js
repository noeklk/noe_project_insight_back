// src/api/controllers/postController.js
const Session = require('../model/sessionModel');

exports.CreateASession = (req, res) => {
  const new_session = new Session(req.body);

  try {
    new_session.save((error, session) => {

      if (error) {
        res.status(400);
        console.log(error);
        res.json({ message: "Il manque des infos" });
      }
      else {
        res.status(201);
        res.json(session)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}

exports.GetAllSessions = (req, res) => {
  Session.find({}, (error, sessions) => {

    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: "Erreur serveur." })
    }
    else {
      res.status(200);
      res.json(sessions);
    }
  })
}

exports.GetASessionById = (req, res) => {
  const {id_session} = req.params;

  try {
    Session.findById(id_session, (error, sessions) => {
      if (error) {
        res.status(400);
        console.log(error);
        res.json({ message: `l'id de session: ${id_session} est introuvable` });
      } else {
        res.status(200);
        res.json(sessions);
      }
    })
  }
  catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: 'erreur serveur' });
  }
}

exports.UpdateASessionById = (req, res) => {

  try {
    Session.findByIdAndUpdate(req.params.id_session, req.body, { new: true }, (error, session) => {

      if (error) {
        res.status(400);
        console.log(error);
        res.json({ message: "Id introuvable" });
      }
      else {
        res.status(200);
        res.json(session)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}

exports.DeleteASessionById = (req, res) => {
  try {
    Session.findByIdAndRemove(req.params.id_session, (error) => {

      if (error) {
        res.status(400);
        console.log(error);
        res.json({ message: "Id introuvable" });
      }
      else {
        res.status(200);
        res.json({ message: "Session supprimé" })
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}