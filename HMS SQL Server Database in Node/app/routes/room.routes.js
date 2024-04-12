module.exports = app => {
    const roomController = require('../controllers/room.controller')

    app.route('/room')
        .post(roomController.create)
        .get(roomController.read)

    app.route('/room/:room_id')
        .put(roomController.update)
        .delete(roomController.delete)
        .get(roomController.readById)
}