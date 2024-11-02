import express from "express";
import cors from "cors"
import user from "./user";
import { validationResult } from "express-validator";


const app = express();
const port = 5478;


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hi")
}) 

app.post("/signup", signupValidators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } 
    if 
    let promise = await user.signup(req.body.email, req.body.password)

})

app.listen(port, () => {
    console.log(`Piggy Pass @ localhost:${port}`)
})

