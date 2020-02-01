// src/api/route/noteRoute.js
const noteController = require('../controller/noteController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app
    .route('/modules/:id_module/notes')
    .get(noteController.GetAllNotesByModuleId)
    .post(noteController.CreateANoteOnModuleId);
};
