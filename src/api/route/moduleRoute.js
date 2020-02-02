const moduleController = require('../controller/moduleController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/modules')
    .get(moduleController.GetAllModules);

  app.route('/modules/:id_module')
    .get(moduleController.GetAModuleById)
    .put(moduleController.UpdateAModuleById)
    .delete(moduleController.DeleteAModuleById);

  app.route('/sessions/:id_session/modules')
    .get(moduleController.GetAllModulesBySessionId);

  // app.route('/intervenants/:id_intervenant/modules') A FAIRE
  //   .get(moduleController.GetAllModulesByContributorId);

  app.route('/intervenants/:id_intervenant/sessions/:id_session/modules')
    .post(moduleController.CreateAModuleBySessionIdAndContributorId)
    .get(moduleController.GetAllModulesByContributorIdAndSessionId);

  app.route('/intervenants/:id_intervenant/sessions/:id_session/modules/:id_module')
    .get(moduleController.GetAModuleByContributorIdAndSessionIdAndModuleId)
    .put(moduleController.UpdateAModuleByContributorIdAndSessionIdAndModuleId)
};
