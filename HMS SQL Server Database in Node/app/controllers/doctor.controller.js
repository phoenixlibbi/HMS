const Doctor = require('../models/doctor.model')

exports.create = async(req, res) => {
    const doctor = await Doctor.create(req.body)
    if(doctor){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const doctor = await Doctor.read();
    res.status(200).send(doctor)
}

exports.getAll = async(req, res) => {
    const doctor = await Doctor.getAll();
    res.status(200).send(doctor)
}

exports.getDoctorFromEmp = async(req, res) => {
    const doctor = await Doctor.getDoctorFromEmp();
    res.status(200).send(doctor)
}

exports.delete = async (req, res) => {
    const doctor = await Doctor.delete(req.params.doctor_id, req.body);

    if (doctor) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const doctor = await Doctor.readById(req.params.doctor_id)
    res.status(200).send(doctor)
}