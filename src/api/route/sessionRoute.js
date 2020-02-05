const sessionController = require("../controller/sessionController");

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route("/sessions")
    .get(sessionController.GetAllSessions)
    .post(sessionController.CreateASession);

  app.route("/sessions/:id_session")
    .get(sessionController.GetASessionById)
    .put(sessionController.UpdateASessionById)
    .delete(sessionController.DeleteASessionById);
};
