const Employee = require('../models/employee.model')

exports.create = async(req, res) => {
    const employee = await Employee.create(req.body)
    if(employee){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const employee = await Employee.read();
    res.status(200).send(employee)
}

exports.getAll = async(req, res) => {
    const employee = await Employee.getAll();
    res.status(200).send(employee)
}

exports.delete = async (req, res) => {
    const employee = await Employee.delete(req.params.employee_id, req.body);
    if (employee) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const employee = await Employee.readById(req.params.employee_id);
    res.status(200).send(employee)
}