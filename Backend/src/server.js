import { connectDb } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { serve } from "inngest/express";

import express from "express";
import { inngest , functions } from "./lib/inngest.js";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import chatRoute from "./routes/chatRoute.js"


const app = express();


//MiddleWares- // Important: ensure you add JSON middleware to process incoming JSON POST payloads
app.use(express.json());

app.use(clerkMiddleware());//@ that will verify the token and then attach the auth you can use req.auth()

app.use(cors({origin : ENV.CLIENT_URL , credentials : true}));

app.use('/api/chat' , chatRoute);



app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/" , (_,res) => {
    res.send("Helllo Jiiii Welcome To The InterViewlyyyy")
});


//!! Best Way To Start The Server 
const startServer = async () => {

    try {
        
        await  connectDb();
        app.listen(ENV.PORT, () => {
            console.log(`app is running SuccessFullyy at port ${ENV.PORT}`) 
        })

    }
    catch(e) {
        console.error("Faild To Start Server " , e);
    }
};

startServer();
