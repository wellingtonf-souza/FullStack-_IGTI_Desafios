import express from "express";
import mongoose from "mongoose";
import config from "config";
import { router } from "./routes/accountsRouter.js";

//prettier-ignore
mongoose.connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connect...");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("API started");
});
