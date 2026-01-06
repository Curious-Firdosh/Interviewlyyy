import { ENV } from "./env.js";
import {StreamChat} from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk"

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    throw new Error("Stream API Key and Secret are required");
};

export const chatClient =  StreamChat.getInstance(apiKey , apiSecret);  // This Is For Chat Messaging
export const streamClient = new StreamClient(apiKey , apiSecret);


export const UpsertStreamUser = async(userdata) => {

    try {
            await chatClient.upsertUser(userdata);
            return userdata;
    }
    catch (e){
         console.error("Erorr In Upserting Stream User" , e);
         
    }
};


export const deleteStreamUser = async(userId) => {

    try {
            await chatClient.deleteUser(userId);
            console.log("Stream User Deleted Successfully ");
            return true;
    }
    catch (e){
         console.error("Erorr In Deleting Stream User" , e);
          return false;
    }
}