import asyncErrorWrapper from "express-async-handler";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { resErr, resMsg } from "../middlewares/general.js";
import Article from "../models/article.js";

const getUsers = asyncErrorWrapper(async (req, res, next) => {
    const { offset = 0, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const users = await User.find()
        .sort(sortOptions)
        .limit(parseInt(limit))
        .skip(parseInt(offset));

    resMsg(users, 'Users Sent Successfully!', 200, res);
})

const signupByEmail = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;

    console.log(req.body);

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return resErr("This email already exists", 400, res);
    }

    const user = new User({
        name,
        email,
        password
    })

    await user.save();

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }
    console.log(`Payload is:`);
    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const data = {
        token: token
    }

    resMsg(data, 'User Successfully Singed up, Token Delievered!', 200, res);
})

const createArticle = asyncErrorWrapper(async (req, res, next) => {
    const { title, content } = req.body;

    const article = new Article({
        title,
        content,
        author: req.user._id
    })

    await article.save();

    const data = {
        article: article
    }

    resMsg(data, 'Article Added Successfully!', 200, res);
})

export { getUsers, signupByEmail, createArticle };