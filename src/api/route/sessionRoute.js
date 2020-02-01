// src/api/routes/sessionRoute.js
const sessionController = require('../controller/sessionController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions')
    .get(sessionController.GetAllSessions)
    .post(sessionController.CreateASession);

  app.route('/sessions/:session_id')
    .put(sessionController.UpdateASessionById)
    .delete(sessionController.DeleteASessionById);
}