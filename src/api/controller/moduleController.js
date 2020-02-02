const Module = require('../model/moduleModel');
const Session = require('../model/sessionModel');
const User = require('../model/userModel');

const errorMessage = 'Erreur Serveur';

exports.CreateAModuleOnSessionIdAndContributorId = async (req, res) => {
  let new_module = new Module(req.body);
  const { id_session } = req.params;
  const { id_intervenant } = req.params;
  new_module.id_session = id_session;
  new_module.id_intervenant = id_intervenant;

  try {
    User.find({ _id: id_intervenant, role: 'intervenant' }, (error, intervenants) => {
      if (intervenants.length) {
        console.log(`id_intervenant: ${id_intervenant} existe, check de la session`);

        Session.findById(id_session, (error, sessions) => {
          if (!error && sessions) {
            new_module.save((error, modules) => {
              if (!error && modules) {
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
      } else {
        res.status(400);
        console.log(error);

        res.json({ message: `L'id intervenant: ${id_intervenant} n'existe pas` })
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
      if (!error && modules) {
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
      if (!error && sessions) {
        console.log(`id_session : ${id_session} existe, listing des modules correspondant`);

        Module.find({ id_session }, (error, modules) => {
          if (modules.length) {
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
      if (!error && modules) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        if (error) console.log(error);
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
      if (!error && modules) {
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
      if (!error && modules) {
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
