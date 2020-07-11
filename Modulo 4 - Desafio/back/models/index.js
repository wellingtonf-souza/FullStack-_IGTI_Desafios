import mongoose from "mongoose";
import gradeModel from "./gradeModel.js";

const db = {};
db.url = process.env.MONGODB;
db.mongoose = mongoose;
db.Grade = gradeModel(mongoose);

export { db };
