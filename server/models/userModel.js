import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "not set"],
        default: "",
    },
    role: {
        type: String,
        required: true,
        enum: ["seller", "admin", "buyer"],
    },
    watchlist: {
        type: [String],
        default: [],
    },
    address: {
        type: String,
        default: "",
    },
    orders: {
        type: [String],
        default: [],
    },
    reviews: {
        type: [String],
        default: [],
    },
},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;