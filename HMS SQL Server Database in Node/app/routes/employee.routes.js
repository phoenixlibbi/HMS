module.exports = app => {
    const employeeController = require('../controllers/employee.controller')

    app.route('/employee')
        .post(employeeController.create)
        .get(employeeController.read)

    app.route('/employee/:employee_id')
        .delete(employeeController.delete)
        .get(employeeController.readById)

        app.route('/employee/count/all')
        .get(employeeController.getAll)
}