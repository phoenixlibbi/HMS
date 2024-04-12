const Nurse = require('../models/nurse.model')

exports.create = async(req, res) => {
    const nurse = await Nurse.create(req.body)
    if(nurse){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const nurse = await Nurse.read();
    res.status(200).send(nurse)
}

exports.getAll = async(req, res) => {
    const nurse = await Nurse.getAll();
    res.status(200).send(nurse)
}

exports.getNurseFromEmp = async(req, res) => {
    const nurse = await Nurse.getNurseFromEmp();
    res.status(200).send(nurse)
}

exports.delete = async (req, res) => {
    const nurse = await Nurse.delete(req.params.nurse_id, req.body);

    if (nurse) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const nurse = await Nurse.readById(req.params.nurse_id)
    res.status(200).send(nurse)
}