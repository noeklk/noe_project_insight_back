// src/api/route/moduleRoute.js
const moduleController = require('../controller/moduleController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions/:session_id/modules')
    .get(moduleController.ListAllModulesFromASession)
    .post(moduleController.CreateAModule);

  app.route('/modules/:module_id')
    .get(moduleController.GetAModule)
    .put(moduleController.UpdateAModule)
    .delete(moduleController.DeleteAModule);
}