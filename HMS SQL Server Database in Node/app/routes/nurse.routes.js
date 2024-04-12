module.exports = app => {
    const nurseController = require('../controllers/nurse.controller')

    app.route('/nurse')
        .post(nurseController.create)
        .get(nurseController.read)

    app.route('/nurse/all')
        .get(nurseController.getNurseFromEmp)

    app.route('/nurse/:nurse_id')
        .delete(nurseController.delete)
        .get(nurseController.readById)

    app.route('/nurse/count/all')
        .get(nurseController.getAll)
}