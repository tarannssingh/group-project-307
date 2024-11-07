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


//MongoDB schema and model for Credentials
const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  website: { type: String, required: true },
  password: { type: String, required: true }
});

const Credential = mongoose.model('Credential', credentialSchema);

export default User; Credential;
