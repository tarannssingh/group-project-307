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


  import {body, validationResult} from "express-validator"

const signupValidators = [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long")
        // .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z])$/)
        .isStrongPassword({
            minLength: 8,
            minLowercase: 3,
            minUppercase: 2,
            minNumbers: 2,
            minSymbols: 1,
            returnScore: false,
        })
        .withMessage("Password must include at least 2 uppercase, 3 lowercase, 1 symbol, and 2 digits")
]

const signup = async (email, password) => {
    // check if DB has email, username, assciated
    
}

const login = async (email, password) => {

}

export default {signupValidators, signup}