import mongoose from "mongoose";
import Credential from "./credential.js";

mongoose.set("debug", true);

// const mongoURI = 'mongodb+srv://admin:WB8kHNmtJGNx8J1F@307-cluster.dvtn5.mongodb.net/?retryWrites=true&w=majority&appName=307-cluster'; // Replace with MongoDB connection string
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB connection error:', err));


function findAllCredentials() {
    return Credential.find();
}
    
function findCredentialByWebsite(name) {
    return Credential.find({ name: name });
    
}
    
function findCredentialById(id) {
    return Credential.findById(id);
    
}
    
export default { findAllCredentials, findCredentialById, findCredentialByWebsite };
    
