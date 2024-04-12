module.exports = app => {
    const doctorController = require('../controllers/doctor.controller')

    app.route('/doctor')
        .post(doctorController.create)
        .get(doctorController.read)

    app.route('/doctor/all')
        .get(doctorController.getDoctorFromEmp)

    app.route('/doctor/:doctor_id')
        .delete(doctorController.delete)
        .get(doctorController.readById)

    app.route('/doctor/count/all')
        .get(doctorController.getAll)
}