import { Inngest} from "inngest";

import User from "../model/User.js";
import { connectDb } from "./db.js";
import { deleteStreamUser, UpsertStreamUser } from "./stream.js";

export const inngest = new Inngest({id : "interviewlyyy"})


// Api To Create The Function That will save the data into the db 
const createUserInDB =  inngest.createFunction (

    {id : "createUser"},
    {event : "clerk/user.created"},

    async({event}) => {
        
        try {
            await connectDb();

            const {id , email_addresses , first_name, last_name , image_url} = event.data

            const userdata = await User.create({
                clerkId : id ,
                name : `${first_name || ""} ${last_name || ""}`,
                email : email_addresses[0]?.email_address,
                profileImage : image_url
            });
            
            // sent the User Data that coming from the Clerk To The Stream.js Function that will take an argumanet Userdata 
            await UpsertStreamUser({
                id : userdata.clerkId.toString(),
                name : userdata.name,
                email : userdata.email,
                image : userdata.profileImage
            });
            
        console.log("Testing : That Ingest function Run SuccessFully" , userdata);

        } catch (error) {
        
            console.error("Error creating user:", error);
            throw error; // Re-throw to let Inngest handle retry logic
        }
    }
);



const deleteUserFromDB =  inngest.createFunction (

    {id : "deleteUser"},
    {event : "clerk/user.deleted"},

    async({event}) => {
        try{
            await connectDb();

            const {id} = event.data;    
            const deletedUser = await User.findOneAndDelete({clerkId : id});

            await deleteStreamUser(id.toString())

             console.log("Testing : That Ingest function Run SuccessFully");
            
        }
        catch(error){
            console.error("Error deleting user:", error);
            throw error; // Re-throw to let Inngest handle retry logic
        }
    }
);

export const functions = [createUserInDB , deleteUserFromDB]