import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

//MongoDB schema and model for Credentials
const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  website: { type: String, required: true },
  password: { type: String, required: true }
});

const Credential = mongoose.model('Credential', credentialSchema);

export default User; Credential;