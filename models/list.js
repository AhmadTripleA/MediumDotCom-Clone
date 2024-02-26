import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a Name"],
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the moderator (user) of this list"],
    },
    desc: {
        type: String,
        default: "No Description."
    },
    articles: {
        type: [mongoose.Schema.ObjectId],
        ref: "Article",
        default: []
    },
    followers: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        default: []
    },
    likes: {
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        default: []
    },
    replies: {
        type: [mongoose.Schema.ObjectId],
        ref: "Comment",
        default: []
    }
}, { timestamps: true });

const List = mongoose.model("list", listSchema);

export default List;