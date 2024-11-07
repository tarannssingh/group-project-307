import mongoose from "mongoose"


const UserSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            trim: true
        },
        password : {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
    { collection : "users"}
);

const User = mongoose.model("User", UserSchema)

export default User
// Will fetch regardless, model just allows us to play with data as if they were objects