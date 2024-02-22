import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please Provide a Name"],
        default: "Name"
    },
    profile: {
        type: String,
        required: [true, "Please Provide a Profile Picture"],
        default: "default.png"
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Provide an Email"],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    bio: {
        type: String,
        required: [true, "Please Provide a Bio"],
        default: "No Bio"
    },
    followers: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        default: []
    },
    following: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;