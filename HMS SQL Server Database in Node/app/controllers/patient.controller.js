const Patient = require('../models/patient.model')

exports.create = async(req, res) => {
    const patient = await Patient.create(req.body)
    if(patient){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const patient = await Patient.read();
    res.status(200).send(patient)
}

exports.getAll = async(req, res) => {
    const patient = await Patient.getAll();
    res.status(200).send(patient)
}

exports.delete = async (req, res) => {
    const patient = await Patient.delete(req.params.patient_id, req.body);

    if (patient) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const patient = await Patient.readById(req.params.patient_id)
    res.status(200).send(patient)
}

exports.readByName = async(req, res) => {
    const patient = await Patient.readByName(req.params.patient_name)
    res.status(200).send(patient)
}