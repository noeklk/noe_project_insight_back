const Module = require("../model/moduleModel");
const Session = require("../model/sessionModel");
const User = require("../model/userModel");

const config = require("../../config");
const { errorMessage } = config;

exports.CreateAModuleBySessionIdAndContributorId = (req, res) => {
  let new_module = new Module(req.body);
  const { id_session } = req.params;
  const { id_intervenant } = req.params;
  new_module.id_session = id_session;
  new_module.id_intervenant = id_intervenant;

  try {
    User.findOne({ _id: id_intervenant, role: "intervenant" }, (error, intervenants) => {
      if (!error && intervenants) {
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
                res.json({ message: "Il manque des informations" });
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
      if (!error && modules.length) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: "Aucun module trouvé" });
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

    Module.find({ id_session }, (error, modules) => {
      if (!error && modules.length) {
        res.status(200);
        res.json(modules);

      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Aucun module portant pour id session: ${id_session} trouvé` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.GetAllModulesByContributorId = (req, res) => {
  const { id_intervenant } = req.params;

  try {

    Module.find({ id_intervenant }, (error, modules) => {
      if (!error && modules.length) {
        res.status(200);
        res.json(modules);

      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Aucun module portant pour id intervenant: ${id_intervenant} trouvé` });
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

exports.GetAllModulesByContributorIdAndSessionId = (req, res) => {
  const { id_intervenant } = req.params;
  const { id_session } = req.params;

  try {
    Module.find({ id_intervenant, id_session }, (error, modules) => {
      if (!error && modules.length) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Aucun module portant pour id intervenant: ${id_intervenant} et id session: ${id_session} trouvé` });
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
}

exports.GetAModuleByContributorIdAndSessionIdAndModuleId = (req, res) => {
  const { id_intervenant } = req.params;
  const { id_session } = req.params;
  const { id_module } = req.params;

  try {
    Module.find({ _id: id_module, id_intervenant, id_session }, (error, modules) => {
      if (!error && modules.length) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Aucun module portant pour id: ${id_module}, id session: ${id_session} et id intervenant: ${id_intervenant} trouvé` });
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
}

exports.UpdateAModuleById = (req, res) => {
  const { id_module } = req.params;

  try {
    Module.findByIdAndUpdate(id_module, req.body, { new: true }, (error, modules) => {
      if (!error && modules) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `L'id de module avec l'id: ${id_module} n'existe pas` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
};

exports.UpdateAModuleByContributorIdAndSessionIdAndModuleId = (req, res) => {
  const { id_intervenant } = req.params;
  const { id_session } = req.params;
  const { id_module } = req.params;

  try {
    Module.findOneAndUpdate({ _id: id_module, id_intervenant, id_session }, req.body, { new: true }, (error, modules) => {
      if (!error && modules) {
        res.status(200);
        res.json(modules);
      } else {
        res.status(400);
        console.log(error);
        res.json({ message: `Le module avec l'id: ${id_module}, l'id d'intervenant: ${id_intervenant} et l'id session: ${id_session} n'existe pas` });
      }
    });
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({ message: errorMessage });
  }
}

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
