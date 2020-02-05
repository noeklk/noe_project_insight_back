const sessionController = require("../controller/sessionController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route("/sessions")
    .get(sessionController.GetAllSessions)
    .post(jwtMiddleware.VerifyAdminToken, sessionController.CreateASession);

  app.route("/sessions/:id_session")
    .get(jwtMiddleware.VerifyAdminOrGuestToken, sessionController.GetASessionById)
    .put(jwtMiddleware.VerifyAdminToken, sessionController.UpdateASessionById)
    .delete(jwtMiddleware.VerifyAdminToken, sessionController.DeleteASessionById);

    app.route("/session/annee/:annee")
    .get(sessionController.GetASessionByYear);
};
