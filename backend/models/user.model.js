import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLegtgh: 8,
    },
    profilePic: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    }
},{
    versionKey:false
})

export default mongoose.model('User', userSchema)
