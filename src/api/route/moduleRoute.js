// src/api/route/moduleRoute.js
const moduleController = require('../controller/moduleController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions/:id_session/modules')
    .get(moduleController.ListAllModulesFromASession)
    .post(moduleController.CreateAModule);

  app.route('/modules/:id_module')
    .get(moduleController.GetAModule)
    .put(moduleController.UpdateAModule)
    .delete(moduleController.DeleteAModule);
}