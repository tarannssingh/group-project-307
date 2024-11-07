import bcrypt from "bcrypt"
import {body, validationResult} from "express-validator"
import User from "./user.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import dotenv from "dotenv"
dotenv.config()


const accessValidators = [
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

const hashPassword = async (password) => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

const signup = async (email, password) => {
    // check if DB has email already
    const users = await User.find({email: email})
    if (users.length != 0) {
        throw Error("A user with this email already exsists")
    }

    const hashedPassword = await hashPassword(password)
    // make the user and has hthe hpassword 
    const user = await User.create({
        email,
        password: hashedPassword
    })
    console.log(user)
    return user
}

const login = async (email, password) => {
    // validate user
    let user = await User.find({email})
    if (user.length != 1) {
        throw Error("Invalid login. Please try again with a different email.")
    }
    user = user[0]
    if (!(await bcrypt.compare(password, user.password))) {// see if password is correct
        throw Error("Invalid login. Please try again.")
    }
    const payload = {
        sub : user._id,
        email: user.email
    }
    // after validating generate jwt
    return jwt.sign(payload, process.env.JWT_SIGNING_SECRET, {expiresIn: '1h'}) // Store in local storage in browser
    // jwt.sign({user._id })
}

export default {accessValidators, signup, login}