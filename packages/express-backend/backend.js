import express from "express";
import cors from "cors"

const app = express();
const port = 5478;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hi")
}) 

app.listen(port, () => {
    console.log(`Piggy Pass @ localhost:${port}`)
})

