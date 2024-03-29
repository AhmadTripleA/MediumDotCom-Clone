import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
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
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
    },
    bio: {
        type: String,
        default: "No Description."
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
    },
    socials: {
        type: [String],
        default: []
    }
}, { timestamps: true });

// executes this function before "save()" as a middleware
userSchema.pre("save", async function (next) {

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

    next();

})

const User = mongoose.model("user", userSchema);

export default User;