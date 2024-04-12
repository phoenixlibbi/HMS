module.exports = app => {
    const medicineController = require('../controllers/medicine.controller')

    app.route('/medicine')
        .post(medicineController.create)
        .get(medicineController.read)

    app.route('/medicine/:medicine_id')
        .delete(medicineController.delete)
        .get(medicineController.readById)
}