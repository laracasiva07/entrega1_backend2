import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    age: Number,
    email:{
        type: String,
        require: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN", "PREMIUM", "GUEST"],
        default: "USER"
    }
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel