import mongoose from "mongoose";
import User from "../models/user.js";

const getUsers = async (req, res, next) => {
    const { offset = 0, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', tag = null } = req.query;
    
}

module.exports = { getUsers } ;