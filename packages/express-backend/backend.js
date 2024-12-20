import express from "express";
import cors from "cors";
import { validationResult } from "express-validator";
import userServicies from "./user-services.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import credentials from "./credential.js";
import CredentialService from "./credential-services.js";
import User from "./user.js";
import passwordServices from "./password-services.js";
import countCredentials from "./credential-services.js";

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
  const { username, password, website } = req.body;
  const user_id = req.body.jwt.sub;

  try {
    //save the credential
    if (await credentials.findOne({ website, username, user_id })) {
      return res.status(409).json({
        error:
          "Username and Website combination already exist. Update instead.",
      });
    }

    const credential = new credentials({
      username,
      website,
      password: await passwordServices.encrypt(password),
      user_id,
    });
    await credential.save();
    res
      .status(201)
      .json({ message: "Credential stored successfully", id: credential.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving credential" });
  }
});

app.put("/credentials", userServicies.authenticateUser, async (req, res) => {
  const { username, password, website, _id } = req.body;
  try {
    //save the credential
    if (!(await credentials.findOne({ _id, user_id: req.body.jwt.sub }))) {
      return res.status(404).json({
        error: "Did not find specific record to update",
      });
    }
    if (
      await credentials.findOne({
        _id: { $ne: _id },
        username,
        website,
        user_id: req.body.jwt.sub,
      })
    ) {
      return res.status(404).json({
        error:
          "A record already exists with this username for this website. Please update that record instead.",
      });
    }
    const credential = await credentials.findOneAndUpdate(
      { _id, user_id: req.body.jwt.sub, website },
      { username, password: await passwordServices.encrypt(password) },
    );
    return res
      .status(204)
      .json({ message: "Credential updated successfully", id: credential.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating credential" });
  }
});

//DELETE /api/credentials ---deletes a credential by ID
app.delete("/credentials", userServicies.authenticateUser, async (req, res) => {
  try {
    // Attempt to delete the credential by ID
    const credential = await credentials.findOneAndDelete({
      _id: req.body._id,
      user_id: req.body.jwt.sub,
    });
    if (credential) {
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
  try {
    let credentials = await CredentialService.findAllCredentials(
      req.body.jwt.sub,
    );
    credentials = await Promise.all(
      credentials.map(async (c) => {
        c.password = await passwordServices.decrypt(c.password);
        return c;
      }),
    );
    res.status(200).json(credentials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving credentials", error: error.message });
  }
});

// GET /api/credentials/website/:q-- retrive credential based on website searched
app.get(
  "/credentials/website/:q",
  userServicies.authenticateUser,
  async (req, res) => {
    const query = decodeURIComponent(req.params.q);
    try {
      const credential = await CredentialService.findCredentialByWebsite(
        query,
        req.body.jwt.sub,
      );
      if (credential) {
        return res.status(200).json(credential);
      } else {
        return res
          .status(404)
          .json({ message: "Credential not found for this website" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving credential(s)",
        error: error.message,
      });
    }
  },
);

// GET /api/credentials/username/:q-- retrive credential based on website searched
app.get(
  "/credentials/username/:q",
  userServicies.authenticateUser,
  async (req, res) => {
    const query = decodeURIComponent(req.params.q);
    try {
      const credential = await CredentialService.findCredentialByUsername(
        query,
        req.body.jwt.sub,
      );
      if (credential) {
        return res.status(200).json(credential);
      } else {
        return res
          .status(404)
          .json({ message: "Credential not found for this website" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving credential(s)",
        error: error.message,
      });
    }
  },
);

// Produces a random valid password
app.get("/randPass", async (req, res) => {
  try {
    const password = await passwordServices.passwordGenCheck();
    res.status(200).json(password);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error generating password", error: error.message });
  }
});

// Substitutes characters in an input to turn into a password
app.post("/subPass", (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }
  const password = passwordServices.substituteWord(input);
  res.json({ password });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Piggy Pass @ localhost:${port}`);
});
