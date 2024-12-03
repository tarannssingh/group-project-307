//MongoDB schema and model for Credentials
import mongoose, {ObjectId} from "mongoose";

const credentialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    website: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    user_id : {
      type: ObjectId,
      required: true,
    }
  },
  { collection: "credentials" },
);

const credentials = mongoose.model("credentials", credentialSchema);

export default credentials;
