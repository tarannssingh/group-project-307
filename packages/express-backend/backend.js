import express from "express";
import cors from "cors"
import { validationResult } from "express-validator";
import userServicies from "./user-services.js";
import dotenv from "dotenv"
import mongoose from "mongoose"
import Credential from "./user.js";

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
            return res.status(400).json({ errors: errors.array() });
        }
        const newUser = await userServicies.signup(req.body.email, req.body.password, req.body.confirmPassword)
        return res.status(201).json({
            message: "User Created",
            totp_secret: newUser.totp_secret,
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

app.post("/login", userServicies.loginValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            throw Error(errors.array()[0].msg)
        }
        const jwt = await userServicies.login(req.body.email, req.body.password, req.body.totp)
        return res.status(200).json({message: jwt})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})


//POST /api/credential endpoint -- accept username, website and password
app.post('/api/credential', async(req, res) =>{
    const { username, password, website} = req.body;
    console.log(req.body)
    if ( !username || !website || !password){
        
        return res.status(400).json({error: "Username, password and website are required"})
    }

    //add encrypt for passowrd beinf added
   // Save the credential to the database
   try {
        //save the credential
        const credential = new Credential ({username, website, password});
        await credential.save();
        res.status(201).json({ message: "Credential stored successfully", id: credential.id }); }
   catch (error) 
    {
    res.status(500).json({ error: "Error saving credential" });
    }
})

//for sprint 3
//PUT /api/credentials/:id ---allows updating username, website and password
//app.put('/api/credentials/:id')



//DELETE /api/credentials/:id ---deletes a credential by ID
app.delete('/api/credentials/:id', async(req,res) =>{
    const { id } = req.params;

    try {
        // Attempt to delete the credential by ID
        const deletedCredential = await Credential.findByIdAndDelete(id);

        // if not found
        if (!deletedCredential) {
            return res.status(404).json({ error: "Credential not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "Credential deleted successfully" });
    } 
    catch (error) {
        // Handle any errors during the delete process
        res.status(500).json({ error: "Error deleting credential" });
    }
});


// GET /api/credentials ---Retrieve ALL credentials, including passwords
app.get('/api/credentials', async (req, res) => {
   try{
        const credentials = await Credential.find();
        res.status(200).json(credentials);
   } catch (error)
   {
    res.status(500).json({ error: "Error retrieving credentials" });
   }
});

// GET /api/credentials/:id ---Retrieve a specific credential, including password
app.get('/api/credentials/:id', (req, res) => {
    const credential = credentials.find(c => c.id === parseInt(req.params.id));
    
    if (!credential) {
        return res.status(404).json({ error: "Credential not found" });
    }

    res.status(200).json(credential);
});

//GET /api/credentials/search? ---Find credentials based on a website serch
app.get('/api/credentials/search', async (req, res) => {
    const { website } = req.query; // Get the website from query parameters

        try {
            const credentials = await Credential.find({ website: { $regex: website, $options: 'i' } }); // Case-insensitive search
            res.status(200).json(credentials);
        } catch (error) {
            res.status(500).json({ error: "Error searching for credentials" });
        }
});

app.listen(port, () => {
    console.log(`Piggy Pass @ localhost:${port}`)
})
