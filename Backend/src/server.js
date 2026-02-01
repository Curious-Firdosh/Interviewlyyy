import { connectDb } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { serve } from "inngest/express";
import path from "path";

import express from "express";
import { inngest , functions } from "./lib/inngest.js";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import chatRoute from "./routes/chatRoute.js"
import sessionRoute from "./routes/sessionRoute.js"

const app = express();



//MiddleWares- // Important: ensure you add JSON middleware to process incoming JSON POST payloads
app.use(express.json());


app.use(cors({
    origin: true,        // reflect request origin
    credentials: true,   // allow cookies
}));


app.use(clerkMiddleware());//@ that will verify the token and then attach the auth you can use req.auth()



app.use('/api/chat' , chatRoute);
app.use('/api/sessions' ,  sessionRoute);

// to send request to the inngest cloud 
app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/health" , (_,res) => {
    res.send("Helllo Jiiii Welcome To The InterViewlyyyy")
});

// @ Make App Ready For Deployment
if (ENV.NODE_ENV === "production") {

  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


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
