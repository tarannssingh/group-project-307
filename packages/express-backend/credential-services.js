import mongoose from "mongoose";
import credentials from "./credential.js";

mongoose.set("debug", true);

// Function to find credentials by website
async function findCredentialByWebsite(website, user_id) {
  try {
    const credential = await credentials.findOne({ website, user_id });
    return credential;
  } catch (error) {
    throw new Error(`Error finding credential by website: ${error.message}`);
  }
}

// Function to find credentials by username
async function findCredentialByUsername(username, user_id) {
  try {
    const credential = await credentials.findOne({ user_id, username });
    return credential;
  } catch (error) {
    throw new Error(`Error finding credential by username: ${error.message}`);
  }
}

// // Additional function to find credentials by both username and website if needed
// async function findCredentialByUsernameAndWebsite(username, website) {
//     try {
//         const credential = await Credential.findOne({ username, website });
//         return credential;
//     } catch (error) {
//         throw new Error(`Error finding credential by username and website: ${error.message}`);
//     }
// }

//retruns all credentials
async function findAllCredentials(user_id) {
  try {
    const allCredentials = await credentials.find({});
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
  // findCredentialByUsernameAndWebsite,
};
