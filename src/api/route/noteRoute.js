const noteController = require('../controller/noteController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/notes/')
    .get(noteController.GetAllNotes);

  app.route('/notes/:id_note')
    .get(noteController.GetANoteById)
    .put(noteController.UpdateANoteById)
    .delete(noteController.DeleteANoteById);

  app.route('/modules/:id_module/notes')
    .get(noteController.GetAllNotesByModuleId);

  app.route('/etudiants/:id_etudiant/notes')
    .get(noteController.GetAllNotesByStudentId);

  app.route('/etudiants/:id_etudiant/modules/:id_module/notes')
    .post(noteController.CreateANoteByStudentIdAndModuleId)
    .get(noteController.GetAllNotesByModuleIdAndStudentId);

  app.route('/etudiants/:id_etudiant/modules/:id_module/notes/:id_note')
    .put(noteController.UpdateANoteByModuleIdAndStudentIdAndNoteId);
};
