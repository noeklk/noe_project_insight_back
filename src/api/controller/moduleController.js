// src/api/controllers/moduleController.js
const Module = require('../model/moduleModel');
const Session = require('../model/sessionModel');

exports.CreateAModule = (req, res) => {
  const new_module = new Module(req.body);
  const { id_session } = req.params;
  new_module.id_session = req.params.id_session;

  try {
    Session.findById(id_session, (error, session) => {

      if (session) {
        console.log(`id_session : ${id_session} existe, création du module`);

        new_module.save((error, module) => {
          if (error) {
            res.status(400);
            console.log(error);
            res.json({ message: 'Il manque des informations' });
            return;
          }
          else {
            res.status(201);
            res.json(module);
          }
        })

      }
      else {
        res.status(400);
        console.log(error);
        res.json({ message: `l'id session: ${id_session} n'existe pas` })
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}

exports.GetAllModulesBySessionId = (req, res) => {
  const { id_session } = req.params;

  try {
    Session.findById(id_session, (error, session) => {

      if (session) {
        console.log(`id_session : ${id_session} existe, listing des modules correspondant`);

        Module.find({ id_session }, (error, modules) => {
          if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." })
          }
          else {
            res.status(200);
            res.json(modules);
          }
        })
      } else {
        res.status(400);
        console.log(error);
        console.log(`l'id session: ${id_session} n'existe pas`);
        res.json({ message: 'id non existant' });
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur." })
  }
}

exports.GetAModuleById = (req, res) => {
  try {
    Module.findById(req.params.id_module, (error, module) => {

      if (error) {

        res.status(400);
        console.log(error);
        res.json({ message: "Id introuvable" });
      }
      else {
        res.status(200);
        res.json(module)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}

exports.UpdateAModuleById = (req, res) => {
  try {
    Module.findByIdAndUpdate(req.params.id_module, req.body, { new: true }, (error, module) => {

      if (error) {
        res.status(400);
        console.log(error);
        res.json({ message: "Id introuvable" });
      }
      else {
        res.status(200);
        res.json(module)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}
exports.DeleteAModuleById = (req, res) => {
  const { id_module } = req.params;

  try {
    Module.findByIdAndRemove(id_module, (error) => {

      if (error) {

        res.status(400);
        console.log(error);
        res.json({ message: "Id introuvable" });
      }
      else {
        res.status(200);
        res.json({ message: `Le module avec l'id: ${id_module} a été correctement supprimé` })
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: "Erreur serveur" })
  }
}