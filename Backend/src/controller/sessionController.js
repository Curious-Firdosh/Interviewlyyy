import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../model/Session.js";

export  const createSession = async(req,res) => {

    try{
        //@1 take the data from the body
        const {problem, difficulty} = req.body 

        //@2 took id from request
        const userId = req.user._id; //  That is MongoDb Id 
        const clerkId = req.user.clerkId; // that is the clerkId given by clerk

        if(!problem || !difficulty){
            return res.status(400).json({message : "Problem  and Difficulty are Required"})
        };

       //@3 generate Unique Call Id For Stream Video Call
        const callId = `session_${Date.now()}_${Math.random().toString().substring(7)}`;

        //@4 create session  in db 
        const session = await Session.create({
            problem ,
            difficulty ,
            host : userId, // that id from the mongodb is named as host -- because we have the data of that userid in the db 
            callId
        });

         //@5 Create stream Video calll  channel
         await streamClient.video.call("default" , callId).getOrCreate({
              data : {
                created_by_id : clerkId,
                custom : {problem , difficulty , sessionId : session._id.toString() },
              }
        })


        //@6 Chat Messageing Channel Creation Can Be Done Here
        const channel = chatClient.channel("messaging" , callId , {
            name : `${problem} Session`,
            created_by_id : clerkId,
            members :[clerkId]
        });

        await channel.create();

        return res.status(200).json({
            message : "Session Created Successfully",
            session
            
        })

    }
    catch (e) {
        console.log("Erorr While Creating Session " , e);
        return res.status(500).json({
            message : "Internal Server Error",
        })
        
    }
}

export const  getActiveSessions = async (req , res) => {
    
    try {
         
            const sessions = await Session
                            .find({status : "Active"})
                            .populate("host" , "name profileImage email clerkId")
                            .sort({createdAt : -1})
                            .limit(20)
           

           return res.status(200).json({
                message: sessions.length === 0 
                ? "No active sessions found"
                : "Successfully fetched active sessions",
                sessions
            });
    }
    catch (e) {
        console.log("Erorr While  geting ActiveSessions  " , e);
        return res.status(500).json({
            message : "Internal Server Error",
        })
        
    }
}

export const getRecentSessions = async (req,res) => {
    try {

        // get session where the user is host or participent 
         const userId = req.user._id 

            const sessions = await Session.find({
                status : "Compleated",
                $or : [{host : userId} , {participant : userId}]
            })
            .sort({createdAt : -1})
            .limit(20);
                            

           return res.status(200).json({
                message : "Successfully fetched Completed Sessions",
                sessions
            });
    }
     catch (e) {
        console.log("Erorr While  geting RecentSessions " , e);
        return res.status(500).json({
            message : "Internal Server Error",
            data : e
        })
        
    }
}

export const  getSessionbyId = async (req,res) => {
    
    try {

        const {id} = req.params

        const selectedSession = await Session.findById(id)
                                             .populate("host" , "name  profileImage email clerkId ")
                                             .populate("participant" , "name profileImage email clerkId ")
        
         if(!selectedSession) {
            return res.status(404).json({
                message : "Id Details Not Found IN Db "
            })
        };

        return res.status(200).json({
            message : "Session Fetched SuccessFully ",
            selectedSession
        })
    }
    catch (e) {
        console.log("Erorr While gettingSession by Id " , e);
        return res.status(500).json({
            message : "Internal Server Error",
            data : e
        })
        
    }
}


export const joinSession = async (req,res) => {
    try{

        //@ step 1 : get session id from params
        const {id} = req.params;

        //@ step 2 : this userid we use it because we have to store the mongodb id in the session participant field
        const userId = req.user._id; //  That is MongoDb Id
 
        // @step 3 : thid clerk id  we use it because we have to add the user to stream video call channel as a participant
        const clerkId = req.user.clerkId; // that is the clerkId given by clerk

        // @step 4 : find session by id from db
        const session = await Session.findById(id);

        // @ step 5 : check if session exists or not
        if(!session) {
            return res.status(404).json({
                message : "Id Details Not Found IN Db "
            })
        };

        //@ step 6 : check if session is active or not
        if(session.status !== "Active") {
            return res.status(400).json({
                message : "You Can Not Join Compleated Session "
            })
        }

        //@ step 7 : check if user is host or participant already
        
        if(session.host.toString() === userId.toString()){
             return res.status(400).json({
                message : "host Cannot Join its own session"
            })
        };

        // @ step 8 : check if participant slot is already filled or not
        if (session.participant !== null) {
            return res.status(400).json({
                message: "Session is full, participant already joined"
            });
        }
        
        
        // @ chat messaging channel -- add member to chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);


        // @ step 9 : we update session participant field with the user id
        session.participant = userId;
        await session.save();


        return res.status(200).json({
            message: "Successfully joined the session",
            session
        });

    }
    catch (e) {
        console.log("Erorr While joining Session " , e);
        return res.status(500).json({
            message : "Internal Server Error",
            data : e
        });
    }
}




export const endSession = async (req,res) => {
    try{
        //@ step 1 : get session id from params
        const {id} = req.params;

        // step 2 : get the userid from req.user
        const userId = req.user._id; //  That is MongoDb Id

        // step 3 : find session by id from db
        const session = await Session.findById(id);

        // step 4 : check if session exists or not
        if(!session) {
            return res.status(404).json({
                message : "Id Details Not Found IN Db "
            })
        }

        // step 5 : check if the user is host of the session

        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({
                message : "Only hoast can end the session "
            })
        };

        //@ step 6 : check if session is active or not
        if(session.status === "Compleated") {
            return res.status(400).json({
                message : "Session is Already Compleated "
            })
        };

       
        session.status = "Compleated"
        await session.save();

         //@ step 7 : delete the video call Channel 
        const call = streamClient.video.call("default" , session.callId)
        await call.delete({hard : true});

         //@ step 8 : delete the chat Channel 
         const chat = chatClient.channel("messaging" , session.callId);
         await chat.delete();



         return res.status(200).json({
            message : "Session Ended SuccessFully",
            session
         })

    }
    catch (e) {
        console.log("Erorr While ending Session " , e);
        return res.status(500).json({
            message : "Internal Server Error",
            data : e
        })
    }
    
}