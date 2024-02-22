import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
    path: "./config.env"
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express();
const port = process.env.PORT;

const morganStyle = '===> :method End=:url Status=:status Time=:response-time ms - :date[web]';
app.use(morgan(morganStyle));

app.use(bodyParser);

const index = "./routes/index.js";
app.use("/api", index);

app.listen(port, () => {
    console.log(chalk.gray(`Server is Running on Port ${port}`));
})