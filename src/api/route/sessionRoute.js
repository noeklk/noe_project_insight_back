// src/api/routes/sessionRoute.js
const sessionController = require('../controller/sessionController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions')
    .get(sessionController.ListAllSessions)
    .post(sessionController.CreateASession);

  app.route('/sessions/:session_id')
    .put(sessionController.UpdateASession)
    .delete(sessionController.DeleteASession);
}