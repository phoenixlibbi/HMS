module.exports = app => {
    const patientController = require('../controllers/patient.controller')

    app.route('/patient')
        .post(patientController.create)
        .get(patientController.read)

    app.route('/patient/count/all')
        .get(patientController.getAll)

    app.route('/patient/:patient_id')
        .delete(patientController.delete)
        .get(patientController.readById)
    
    app.route('/patient/patient_name/:patient_name')
        .get(patientController.readByName)
}