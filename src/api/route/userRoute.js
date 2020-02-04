const userController = require('../controller/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

module.exports = (app) => {
    // app.route('/users')
    // .post(userController.CreateAUser)
    //     .get(jwtMiddleware.VerifyToken, userController.GetAllUsers);

    app.route('/users/:id_user')
        // .get(userController.GetAUserById)
        .put(jwtMiddleware.VerifyAdminToken, userController.UpdateAUserById)
    // .delete(userController.DeleteAUserById);

    // app.route('/users/:role')
    // .get(userController.GetUsersByRole);

    app.route('/users/register')
        .post(userController.UserRegister);

    app.route('/users/login')
        .post(userController.UserLogin);
}