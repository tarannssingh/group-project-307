import mongoose from "mongoose";
import userModel from "./user";

import dotenv from "dotenv"

dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect(
    process.env.MONGODB_URI,
    // "mongodb://localhost:27017/users", 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  async function findUserById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  
  async function addUser(user) {
    try {
      const userToAdd = new userModel(user);
      const savedUser = await userToAdd.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async function findUserByName(name) {
    return await userModel.find({ name: name });
  }
  
  async function findUserByJob(job) {
    return await userModel.find({ job: job });
  }
  
  async function findUserByNameAndJob(name, job) {
    return await userModel.find({ name: name, job: job });
  }
  
  async function deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }
  
  // async function disconnectDB() {
  //   await mongoose.connection.close();
  //   await mongoose.disconnect();
  // }
  
  export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
  };
  
  // exports.disconnectDB = disconnectDB;