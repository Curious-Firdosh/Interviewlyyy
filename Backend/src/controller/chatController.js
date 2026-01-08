import { chatClient } from "../lib/stream.js"

export const getStreamToken = async (req , res) => {

    try {   
            // use clerkId for stream -- it should match the id we have in the stream dashboard  
            const token = chatClient.createToken(req.user.clerkId)

            console.log("SuccessFully Created The Token ✅✅");
            
            return res.status(200).json({
                token ,
                userId : req.user.clerkId,
                userName : req.user.name,
                userImage : req.user.image 
            });
    }
    catch (e){
            console.error("Error In GetStreamToken Controller" , e);
            return res.status(500).json({message : "Internal Server Error"});
            
    }
}
 
    