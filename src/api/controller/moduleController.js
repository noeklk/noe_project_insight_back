const Module = require('../model/moduleModel');
const Session = require('../model/sessionModel');
const errorMessage = 'Erreur Serveur';

exports.CreateAModuleOnSessionId = (req, res) => {
  const new_module = new Module(req.body);
  const { id_session } = req.params;
  new_module.id_session = req.params.id_session;

  try {
    Session.findById(id_session, (error, sessions) => {
      if (sessions) {
        console.log(`id_session : ${id_session} existe, création du module`);

        new_module.save((error, modules) => {
          if (modules) {
            res.status(201);
            res.json(modules);
          } else {
            res.status(400);
            console.log(error);
            res.json({ message: 'Il manque des informations' });
          }
        });
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id session: ${id_session} n'existe pas` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetAllModules = (req, res) => {
  try {
    Module.find((error, modules) => {
      if (modules) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: 'Aucun module trouvé' });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetAllModulesBySessionId = (req, res) => {
  const { id_session } = req.params;

  try {
    // Vérificationn si l'id de la session fourni en paramètre existe
    Session.findById(id_session, (error, sessions) => {
      if (sessions) {
        console.log(`id_session : ${id_session} existe, listing des modules correspondant`);

        Module.find({ id_session }, (error, modules) => {
          if (modules) {
            res.status(200);
            res.json(modules);

          } else {
            res.status(400);
            console.log(error);
            res.json({ message: `Aucun module portant pour id session: ${id_session} trouvé` });
          }
        });
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id session: ${id_session} n'existe pas` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetAModuleById = (req, res) => {
  const { id_module } = req.params;

  try {
    Module.findById(id_module, (error, modules) => {
      if (modules) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Aucun module portant pour id: ${id_module} trouvé` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.UpdateAModuleById = (req, res) => {
  try {
    Module.findByIdAndUpdate(req.params.id_module, req.body, { new: true }, (error, modules) => {
      if (modules) {
        res.status(400);
        console.log(error);
        res.json({ message: 'Id introuvable' });
      } else {
        res.status(200);
        res.json(modules);
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.DeleteAModuleById = (req, res) => {
  const { id_module } = req.params;

  try {
    Module.findByIdAndRemove(id_module, (error, modules) => {
      if (modules) {
        res.status(200);
        res.json({ message: `Le module avec l'id: ${id_module} a été correctement supprimé` });
        
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id de module: ${id_module} est introuvable` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};
