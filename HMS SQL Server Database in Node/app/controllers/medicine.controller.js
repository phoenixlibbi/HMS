const Medicine = require('../models/medicine.model')

exports.create = async(req, res) => {
    const medicine = await Medicine.create(req.body)
    if(medicine){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const medicine = await Medicine.read();
    res.status(200).send(medicine)
}

exports.delete = async (req, res) => {
    const medicine = await Medicine.delete(req.params.medicine_id, req.body);

    if (medicine) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const medicine = await Medicine.readById(req.params.medicine_id)
    res.status(200).send(medicine)
}