import mongoose from "mongoose";
import credentials from "./credential.js";

mongoose.set("debug", true);

// Function to find credentials by website
async function findCredentialByWebsite(website) {
    try {
        const credential = await credentials.findOne({ website });
        return credential;
    } catch (error) {
        throw new Error(`Error finding credential by website: ${error.message}`);
    }
}

// Function to find credentials by username
async function findCredentialByUsername(username) {
    try {
        const credential = await credentials.findOne({ username });
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
async function findAllCredentials() {
    try {
        const credentials = await credentials.find({});
        return credentials;
    } catch (error) {
        throw new Error(`Error retrieving all credentials: ${error.message}`);
    }
}

export { 
    findCredentialByWebsite, 
    findCredentialByUsername, 
    // findCredentialByUsernameAndWebsite,
    findAllCredentials
};