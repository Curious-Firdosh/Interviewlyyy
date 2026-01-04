import { Inngest} from "inngest";
import { ENV } from "../env.js";
import User from "../model/User.js";
import { connectDb } from "./db.js";

export const inngest = new Inngest({id : "interviewlyyy"})


// Api To Create The Function That will save the data into the db 
const createUser = inngest.createFunction(
    {id: 'createUserInDb'},
    {event : "clerk/user.created"},

    async(event) => {
        await connectDb();

        const {id , email_addresses , first_name, last_name , image_url} = event.data
        
        const userdata = await User.create({
            clerkId : id ,
            name : `${first_name || ""} ${last_name || ""}`,
            email : email_addresses[0]?.email_address,
            profileImage : image_url
        });

        console.log("Testing : That Ingest function Run SuccessFully" , userdata);
        
    }
);


const deleteUser = inngest.createFunction(
    {id : deleteUser},
    {event : "clerk/user.deleted"},

    async (event) => {
        await connectDb();

        const {id} = event.data;

        await User.deleteOne({clerkId : id});

        console.log("Testing , User Deleted SuccessFully");
        
    }


)




export const functions = [createUser , deleteUser]