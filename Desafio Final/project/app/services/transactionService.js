const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const findAll = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await TransactionModel.find({ yearMonth: period });
    res.send(data);
  } catch (err) {
    res.send("Erro: " + err.mensage);
  }
};

const create = async (req, res) => {
  try {
    const Lancamento = new TransactionModel({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
      type: req.body.type,
    });

    const data = await Lancamento.save();
    res.send(data);
  } catch (err) {
    res.send("Erro: " + err.mensage);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.send(data);
  } catch (err) {
    res.send("Erro: " + err.mensage);
  }
};

const remove = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await TransactionModel.findByIdAndRemove({ _id: id });

    if (!data) {
      res.send(`Podcast id ${id} nao encontrado`);
    } else {
      res.send("Podcast excluido com sucesso");
    }
  } catch (err) {
    res.status(500).send("Erro: " + err.mensage);
  }
};

const filterByDescription = async (req, res) => {
  const { description, period } = req.body;
  var condition = description
    ? {
        description: { $regex: new RegExp(description), $options: "i" },
        yearMonth: period,
      }
    : { yearMonth: period };

  try {
    const data = await TransactionModel.find(condition);
    res.send(data);
  } catch (error) {
    res.send("Erro: " + err.mensage);
  }
};

module.exports = { findAll, create, update, remove, filterByDescription };
