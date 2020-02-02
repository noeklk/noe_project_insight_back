const noteController = require('../controller/noteController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/notes/')
    .get(noteController.GetAllNotes);

  app.route('/notes/:id_note')
    .delete(noteController.DeleteANoteById);

  app.route('/modules/:id_module/notes')
    .get(noteController.GetAllNotesByModuleId);

  app.route('/etudiants/:id_etudiant/modules/:id_module/notes')
    .post(noteController.CreateANoteOnModuleIdAndStudentId);
};
