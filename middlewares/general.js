import chalk from "chalk";

function resErr(message, code, res) {
    console.log(chalk.red(`Error: ${message}`));
    res.status(code).json({
        success: false,
        error: message,
    });
}

function resMsg(data, message, code, res) {
    console.log(chalk.green(`Success: ${message}`));
    res.status(code).json({
        success: true,
        message: message,
        data: data
    });
}

module.exports = { resErr, resMsg };