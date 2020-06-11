import express from "express";
import gradesRouter from "./routes/grades.js";

const app = express();
app.use(express.json());

app.use("/grades", gradesRouter);
app.listen(8080, () => {
  console.log("API started");
});
