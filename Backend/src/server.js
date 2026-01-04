import { connectDb } from "./lib/db.js";
import { ENV } from "./lib/env.js";

import epxress from "express";

const app = epxress();



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

startServer()
