const Bill = require('../models/bill.model')

exports.create = async(req, res) => {
    const bill = await Bill.create(req.body)
    if(bill){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.createById = async(req, res) => {
    const bill = await Bill.createById(req.params.payment_id)
    if(bill){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const bill = await Bill.read();
    res.status(200).send(bill)
}

exports.delete = async (req, res) => {
    const bill = await Bill.delete(req.params.payment_id);

    if (bill) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}

exports.readById = async(req, res) => {
    const bill = await Bill.readById(req.params.payment_id)
    res.status(200).send(bill)
}