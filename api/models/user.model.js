import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        tyoe: String,
        required: true
    }
},{timestamps: true}) // time of creation and time of update


const User = mongoose.model('User', userSchema)

export default User