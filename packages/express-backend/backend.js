import express from "express";
import cors from "cors"
import { validationResult } from "express-validator";
import userServicies from "./user-servicies.js";
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error))


const app = express();
const port = 5478;


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hi")
}) 

app.post("/signup", userServicies.accessValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw Error(errors.array()[0].msg)
        } 
        const newUser = await userServicies.signup(req.body.email, req.body.password)
        const jwt = await userServicies.login(req.body.email, req.body.password)
        return res.status(201).json({
            message: "User Created",
            jwt: jwt,
            user: {
                id: newUser.id,
                email: newUser.email,
                created_at: newUser.date
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }
})

app.post("/login", userServicies.accessValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            throw Error(errors.array()[0].msg)
        }
        const jwt = await userServicies.login(req.body.email, req.body.password)
        return res.status(200).json({message: jwt})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})


app.listen(port, () => {
    console.log(`Piggy Pass @ localhost:${port}`)
})

