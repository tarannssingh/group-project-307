import express from "express";
import cors from "cors";
import { validationResult } from "express-validator";
import userServicies from "./user-services.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import credentials from "./credential.js";
import CredentialService from "./credential-services.js";
import User from "./user.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

const app = express();
const port = 5478;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/signup", userServicies.accessValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = await userServicies.signup(
      req.body.email,
      req.body.password,
      req.body.confirmPassword,
    );
    return res.status(201).json({
      message: "User Created",
      totp_secret: newUser.totp_secret,
      user: {
        id: newUser.id,
        email: newUser.email,
        created_at: newUser.date,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});

app.post("/login", userServicies.loginValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw Error(errors.array()[0].msg);
    }
    const jwt = await userServicies.login(
      req.body.email,
      req.body.password,
      req.body.totp,
    );
    return res.status(200).json({ message: jwt });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving users", error: error.message });
  }
});


//CREDENTIAL ENDPOINTS

//POST /api/credential endpoint -- accept username, website and password
app.post("/credentials", userServicies.authenticateUser, async (req, res) => {
  const { username, password, website, user_id} = req.body;
  try {
    //save the credential
    if ((await credentials.findOne({ website, username, user_id }))){
      return res
        .status(409)
        .json({
          error: "Username and Website combination already exist. Update instead."
        })
    }

    const credential = new credentials({ username, website, password, user_id});
    await credential.save();
    res
      .status(201)
      .json({ message: "Credential stored successfully", id: credential.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving credential" });
  }
});

//DELETE /api/credentials/:id ---deletes a credential by ID
app.delete("/credentials/:id", userServicies.authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the credential by ID
    const deletedCredential = await credentials.findByIdAndDelete(id);
    if (deletedCredential) {
      res.status(200).json({ message: "Credential deleted successfully" });
    } else {
      res.status(404).json({ message: "Credential not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting credential", error: error.message });
  }
});

// GET /api/credentials ---Retrieve ALL credentials, including passwords
app.get("/credentials", userServicies.authenticateUser, async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]
  
  try {
    const credentials = await CredentialService.findAllCredentials(req.user_id);
    res.status(200).json(credentials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving credentials", error: error.message });
  }
});

// GET /api/credentials/:website-- retrive credential based on website searched
app.get("/credentials/:website", userServicies.authenticateUser, async (req, res) => {
  const { website } = req.params;
  try {
    const credential = await CredentialService.findCredentialByWebsite(website);
    if (credential) {
      res.status(200).json(credential);
    } else {
      res
        .status(404)
        .json({ message: "Credential not found for this website" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving credential by website",
      error: error.message,
    });
  }
});

// GET /api/credentials/:website-- retrive credential based on website searched

app.get("/credentials/:username", userServicies.authenticateUser, async (req, res) => {
  const { username } = req.params;
  try {
    const credential =
      await CredentialService.findCredentialByUsername(username);
    if (credential) {
      res.status(200).json(credential);
    } else {
      res
        .status(404)
        .json({ message: "Credential not found for this website" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving credential by website",
      error: error.message,
    });
  }
});

//for sprint 3
//PUT /api/credentials/:id ---allows updating username, website and password
//app.put('/api/credentials/:id')

//GET /api/credentials/search? ---Find credentials based on a website thinking about search bars

app.listen(process.env.PORT || port, () => {
  console.log(`Piggy Pass @ localhost:${port}`);
});
