import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please provide the comment content"],
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the moderator (user) of this list"],
    },
    users: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: []
    },
    replies: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

export default Comment;