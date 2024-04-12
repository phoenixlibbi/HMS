module.exports = (app) => {
  const billController = require("../controllers/bill.controller");

  app.route("/bill")
  .post(billController.create)
  .get(billController.read);

  app
    .route("/bill/view/:payment_id")
    .get(billController.readById);

  app
    .route("/bill/delete/:payment_id")
    .delete(billController.delete)

  app
    .route("/bill/add/:payment_id")
    .get(billController.createById)
};
