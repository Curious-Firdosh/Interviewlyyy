import { requireAuth } from "@clerk/express";
import User from "../model/User.js";

export const protectRoute = [
    requireAuth(),// that will cheack user login or not  

    async (req , res , next) => {

        try {
            
            const clerkId = req.auth().userId;
            
            if(!clerkId) { 
                return res.status(401).json({message : "Unauthrized User"});
            };

            // Find User In DB By Clerk Id
            const user = await User.findOne({clerkId});

            if(!user) { 
                return res.status(404).json({message : "user Not Found"});
            };

            
            // attach the userdetails in the request 
            req.user = user;

            next()

        }
        catch (e){
            console.error("Error In Protected middileware" , e);
            return res.status(500).json({message : "Internal Server Error"});
            
        }
    }

    
]

