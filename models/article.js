import mongoose, { mongo } from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Please Provide a Unique Name"],
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the author (user) of this article"],
    },
    content: {
        type: String,
        required: [true, "Please provide the content of this article"]
    },
    timeToRead: {
        type: Number,
        default: 1
    },
    tags: {
        type: [String],
        default: ['general']
    },
    likes: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        default: []
    },
    comments: {
        type: [mongoose.Schema.ObjectId],
        ref: "Comment",
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Article = mongoose.model("article", articleSchema);

export default Article;