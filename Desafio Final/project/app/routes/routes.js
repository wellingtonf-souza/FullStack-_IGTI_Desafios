const express = require("express");
const transactionRouter = express.Router();
const services = require("../services/transactionService.js");

transactionRouter.get("/getAll/", services.findAll);
transactionRouter.post("/create/", services.create);
transactionRouter.put("/update/", services.update);
transactionRouter.delete("/remove/", services.remove);

module.exports = transactionRouter;
