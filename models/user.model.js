import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

const User = mongoose.model("User",userSchema);

export default User;