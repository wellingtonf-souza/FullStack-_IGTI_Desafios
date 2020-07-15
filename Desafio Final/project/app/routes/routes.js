const express = require("express");
const transactionRouter = express.Router();
const services = require("../services/transactionService.js");

transactionRouter.get("/findAll/", services.findAll);
transactionRouter.post("/create/", services.create);
transactionRouter.put("/update/", services.update);
transactionRouter.delete("/remove/", services.remove);
transactionRouter.get("/filterByDescription/", services.filterByDescription);

module.exports = transactionRouter;
