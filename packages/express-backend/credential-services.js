import mongoose from "mongoose";
import credentials from "./credential.js";

mongoose.set("debug", true);

// Function to find credentials by website
async function findCredentialByWebsite(website, user_id) {
  try {
    const credential = await credentials.find({
      user_id,
      website: new RegExp(`${website}`),
    });
    return credential;
  } catch (error) {
    throw new Error(`Error finding credential by website: ${error.message}`);
  }
}

// Function to find credentials by username
async function findCredentialByUsername(username, user_id) {
  try {
    let credential;
    if (username) {
      credential = await credentials.find({
        user_id,
        username: new RegExp(`${username}`),
      });
    } else {
      credential = await credentials.find({ user_id });
    }
    return credential;
  } catch (error) {
    throw new Error(`Error finding credential by username: ${error.message}`);
  }
}

//retruns all credentials
async function findAllCredentials(user_id) {
  try {
    const allCredentials = await credentials.find({ user_id: user_id });
    return allCredentials;
  } catch (error) {
    throw new Error(`Error retrieving all credentials: ${error.message}`);
  }
}

function findCredentialById(id) {
  return Credential.findById(id);
}

export default {
  findAllCredentials,
  findCredentialById,
  findCredentialByWebsite,
  findCredentialByUsername,
};
