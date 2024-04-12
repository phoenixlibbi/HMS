const Test = require('../models/test.model')

exports.create = async(req, res) => {
    const test = await Test.create(req.body)
    if(test){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const test = await Test.read();
    res.status(200).send(test)
}

exports.update = async(req, res) => {
    const test = await Test.update(req.params.test_id, req.body)
    if(test){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.delete = async (req, res) => {
    const test = await Test.delete(req.params.test_id, req.body);

    if (test) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}


exports.readById = async(req, res) => {
    const test = await Test.readById(req.params.test_id)
    res.status(200).send(test)
}