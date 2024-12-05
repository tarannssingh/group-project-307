import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import User from "./user.js";
import jwt from "jsonwebtoken";
import SpeakEasy from "speakeasy";

import dotenv from "dotenv";
dotenv.config();

const accessValidators = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
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
    .withMessage(
      "Password must include at least 2 uppercase, 3 lowercase, 1 symbol, and 2 digits",
    ),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Password and Confirmation Password do not match"),
];

const loginValidators = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 8 })
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
    .withMessage(
      "Password must include at least 2 uppercase, 3 lowercase, 1 symbol, and 2 digits",
    ),
  body("totp")
    .isLength(6)
    .withMessage("Password provide a valid TOTP")
    .isNumeric()
    .withMessage("Password provide a valid TOTP"),
];

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const generateTotpSecret = () => {
  return SpeakEasy.generateSecret({ length: 20 }).base32;
};

const signup = async (email, password, confirm) => {
  // check if DB has email already
  const users = await User.find({ email: email });
  if (users.length != 0) {
    throw Error("A user with this email already exsists");
  }
  if (confirm != password) {
    throw Error("Password and Confirmation Passowrd do not match.");
  }
  const totp_secret = await generateTotpSecret();
  const hashedPassword = await hashPassword(password);
  // make the user and has hthe hpassword
  const user = await User.create({
    email,
    password: hashedPassword,
    totp_secret,
  });
  console.log(user);
  return user;
};

const validateTotp = (secret, token) => {
  return SpeakEasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
    window: 0,
  });
};

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Failed to authenticate user. Please login or signup."
    })
  } else {
    jwt.verify(
      token,
      process.env.JWT_SIGNING_SECRET,
      (error, decoded) => {
        if (decoded) {
          if (!req.body) {
            req.body = {}
          }
          req.body.jwt = decoded
          console.log(req.body);
          
          next();
        } else {
          return res.status(401).json({
            message: "Invalid or expired token. Please login again."
          })
        }
      }
    )
  }
}

const login = async (email, password, totp) => {
  // validate user
  let user = await User.find({ email });
  if (user.length != 1) {
    throw Error("Invalid login. Please try again with a different email.");
  }
  user = user[0];
  if (!(await bcrypt.compare(password, user.password))) {
    // see if password is correct
    throw Error("Invalid login. Please try again.");
  }
  if (!validateTotp(user.totp_secret, totp)) {
    throw Error("Invalid TOTP. Please try again.");
  }
  const payload = {
    sub: user._id,
    email: user.email,
  };
  // after validating generate jwt
  return jwt.sign(payload, process.env.JWT_SIGNING_SECRET, { expiresIn: "1h" }); // Store in local storage in browser
  // jwt.sign({user._id })
};

export default { accessValidators, loginValidators, signup, login, authenticateUser};

// KBFEG3RON42FOTLLINYW22LUHFWES4ZY
