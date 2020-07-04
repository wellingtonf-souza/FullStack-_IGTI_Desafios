import express from "express";
import { accountModel } from "../models/accountsModel.js";

const router = express();

router.post("/deposit", async (req, res) => {
  try {
    const account = await accountModel.findOneAndUpdate(
      {
        $and: [{ agencia: req.body.agencia }, { conta: req.body.conta }],
      },
      { $inc: { balance: req.body.value } },
      { new: true }
    );
    res.send(account);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/saque", async (req, res) => {
  try {
    const account_verify = await accountModel.findOne({
      $and: [{ agencia: req.body.agencia }, { conta: req.body.conta }],
    });
    if (!account_verify) res.send("not find account");
    //prettier-ignore
    if (account_verify.balance < req.body.value + 1){
      res.send("without enough balance")
    }else{     
    const account = await accountModel.findByIdAndUpdate(
      {
        _id: account_verify._id,
      },
      { $inc: { balance: -(req.body.value + 1) } },
      { new: true }
    );
    res.send(account);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/saldo", async (req, res) => {
  try {
    const account = await accountModel.find({
      $and: [{ agencia: req.body.agencia }, { conta: req.body.conta }],
    });
    if (account.length === 0) {
      res.status(404).send("account not find");
    } else {
      res.send(account);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const account = await accountModel.findOneAndDelete({
      $and: [{ agencia: req.body.agencia }, { conta: req.body.conta }],
    });
    if (!account) {
      res.status(404).send("account not find");
    } else {
      const accounts = await accountModel.find(
        { agencia: req.body.agencia },
        { _id: 1 }
      );
      res.send(String(accounts.length));
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/transfer", async (req, res) => {
  const { conta_origem, conta_destino, value } = req.body;
  try {
    const accountO = await accountModel.findOne({
      conta: conta_origem,
    });
    const accountD = await accountModel.findOne({
      conta: conta_destino,
    });
    // prettier-ignore
    if (!accountO && !accountD) return res.status(400).send("account not find");
    if (accountO.agencia === accountD.agencia) {
      if (accountO.balance < value) return res.send("without enough balance");
      const accountOUpdate = await accountModel.findOneAndUpdate(
        { conta: conta_origem },
        { $inc: { balance: -value } },
        { new: true }
      );
      const accountDUpdate = await accountModel.findOneAndUpdate(
        { conta: conta_destino },
        { $inc: { balance: value } },
        { new: true }
      );
      res.send(`new balance origin: ${accountOUpdate.balance}`);
    } else {
      // prettier-ignore
      if (accountO.balance < (value + 8)) return res.send("without enough balance");
      const accountOUpdate = await accountModel.findOneAndUpdate(
        { conta: conta_origem },
        { $inc: { balance: -(value + 8) } },
        { new: true }
      );
      const accountDUpdate = await accountModel.findOneAndUpdate(
        { conta: conta_destino },
        { $inc: { balance: value } },
        { new: true }
      );
      res.send(`new balance origin: ${accountOUpdate.balance}`);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/meanBalance", async (req, res) => {
  const CodeAgencia = req.body.agencia;
  try {
    //prettier-ignore
    const agencia = await accountModel.find({ agencia: CodeAgencia },{_id:0 ,balance: 1 });
    const sumBalance = agencia.reduce((accumulator, current) => {
      return accumulator + current.balance;
    }, 0);
    let meanBalance = sumBalance / agencia.length;
    res.send(`mean balance: ${meanBalance.toFixed(2)}`);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/minBalance", async (req, res) => {
  try {
    const accounts = await accountModel.find();
    const sortAccounts = accounts.sort((first, second) => {
      return first.balance - second.balance;
    });
    res.send(sortAccounts.slice(0, req.body.number));
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/maxBalance", async (req, res) => {
  try {
    const accounts = await accountModel.find();
    const sortAccounts = accounts.sort((first, second) => {
      return second.balance - first.balance;
    });
    res.send(sortAccounts.slice(0, req.body.number));
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/agenciaPrivate", async (req, res) => {
  try {
    const maxAccountsByAgencia = await accountModel.aggregate([
      {
        $group: {
          _id: { agencia: "$agencia" },
          maxValue: { $max: "$balance" },
        },
      },
    ]);
    for (let i = 0; i < maxAccountsByAgencia.length; i++) {
      await accountModel.findOneAndUpdate(
        {
          agencia: maxAccountsByAgencia[i]._id.agencia,
          balance: maxAccountsByAgencia[i].maxValue,
        },
        { agencia: 99 },
        { new: true }
      );
    }
    res.send(maxAccountsByAgencia);
  } catch (err) {
    res.send(err.message);
  }
});

export { router };
