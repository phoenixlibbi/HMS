const Room = require('../models/room.model')

exports.create = async(req, res) => {
    const room = await Room.create(req.body)
    if(room){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.read = async(req, res) => {
    const room = await Room.read();
    res.status(200).send(room)
}

exports.update = async(req, res) => {
    const room = await Room.update(req.params.room_id, req.body)
    if(room){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.delete = async (req, res) => {
    const room = await Room.delete(req.params.room_id, req.body);

    if (room) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}


exports.readById = async(req, res) => {
    const room = await Room.readById(req.params.room_id)
    res.status(200).send(room)
}