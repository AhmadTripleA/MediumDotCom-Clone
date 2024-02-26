import chalk from "chalk";
import mongoose from "mongoose";

async function resErr(message, code, res) {
    console.log(chalk.red(`Error: ${message}`));
    await res.status(code).json({
        success: false,
        error: message,
    });
}

async function resMsg(data, message, code, res) {
    console.log(chalk.green(`Success: ${message}`));
    await res.status(code).json({
        success: true,
        message: message,
        data: data
    });
}

async function errHandler(err, req, res, next) {
    resErr(err.message || 'Internal Error.', err.code || 500, res);
}

export { resErr, resMsg, errHandler };