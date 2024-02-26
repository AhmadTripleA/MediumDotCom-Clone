import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errHandler } from "./middlewares/general.js";

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT;

const morganStyle = chalk.gray('===> :method :url Status=:status :response-time ms - :date[web]');
app.use(morgan(morganStyle));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

import index from "./routes/index.js";
app.use("/api", index);
app.use(errHandler);

app.listen(port, () => {
    console.log(chalk.gray(`Server is Running on Port ${port}`));
})