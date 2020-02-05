const noteController = require("../controller/noteController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route("/notes/")
    .get(noteController.GetAllNotes);

  app.route("/notes/:id_note")
    .get(noteController.GetANoteById)
    .put(noteController.UpdateANoteById)
    .delete(noteController.DeleteANoteById);

  app.route("/modules/:id_module/notes")
    .get(noteController.GetAllNotesByModuleId);

  app.route("/etudiants/:id_etudiant/notes")
    .get(noteController.GetAllNotesByStudentId);

  ////////////////////// ROUTES A UTILISER //////////////////////

  app.route("/etudiants/:id_etudiant/modules/:id_module/notes")
    .post(jwtMiddleware.VerifyAdminOrGuestToken, noteController.CreateANoteByStudentIdAndModuleId)
    .get(noteController.GetAllNotesByModuleIdAndStudentId);

  ////////////////////// ROUTES A UTILISER //////////////////////

  app.route("/etudiants/:id_etudiant/modules/:id_module/notes/:id_note")
    .put(noteController.UpdateANoteByModuleIdAndStudentIdAndNoteId);
};
