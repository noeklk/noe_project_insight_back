// src/api/routes/sessionRoute.js
const sessionController = require('../controller/sessionController');

// Exporte la fonction anonyme
module.exports = (app) => {
  app.route('/sessions')
  .get(sessionController.list_all_sessions)
  .post(sessionController.create_a_session);

  app.route('/sessions/:sessions_id') // req.params.post_id
  // .get(postController.get_a_post)
  .put(sessionController.update_a_session)
  .delete(sessionController.delete_a_session);
}