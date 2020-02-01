const moduleController = require('../controller/moduleController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions/:id_session/modules')
    .get(moduleController.GetAllModulesBySessionId)
    .post(moduleController.CreateAModuleOnSessionId);

  app.route('/modules/:id_module')
    .get(moduleController.GetAModuleById)
    .put(moduleController.UpdateAModuleById)
    .delete(moduleController.DeleteAModuleById);

  app.route('/modules')
    .get(moduleController.GetAllModules);
};
