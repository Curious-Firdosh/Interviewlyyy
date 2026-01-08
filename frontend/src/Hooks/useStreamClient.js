import { useEffect, useState } from "react"
import {StreamChat} from  "stream-chat"
import toast from "react-hot-toast"
import { intitalizeStreamClient , disconnectStreamClient } from "../lib/stream.js";
import { sessionApi } from "../Api/session.js";





const useStreamClient = (session , loadingSession , isHost , isParticipant) => {

    const [streamClient , setStreamClient] = useState(null);
    const [call , setCall] = useState(null)
    const [chatClient , setChatClient] = useState(null);
    const [channel , setChannel] = useState(null);
    const [initializingCall , setIsInitializingCall] = useState(true)


    useEffect(() => {
        let videoCall = null;
        let chatClientInstance = null

        const initCall = async () => {

            if(!session?.callId) return ;
            if(!isHost && !isParticipant) return ;

            try {
                const {token , userId ,userName } = await sessionApi.getstreamToken();

                const client = await intitalizeStreamClient({
                    id : userId,
                    name : userName,
                },
                    token
                );

                setStreamClient(client);

                videoCall = client.call("default" , session.callId);

                await videoCall.join({create : true});

                setCall(videoCall )



                const apiKey = import.meta.env.VITE_STREAM_API_KEY;  
                chatClientInstance = StreamChat.getInstance(apiKey);

                await chatClientInstance.connectUser({
                    id : userId,
                    name : userName,
                },
                    token
                );

                setChatClient(chatClientInstance);

                const chatChannel = chatClientInstance.channel("messaging",session?.callId);
                await chatChannel.watch();

                setChannel(chatChannel);
            }
            catch(e){

                toast.error("faild to join Video Call" )
                console.error("error Init Call" , e);
                
            } finally {
                 setIsInitializingCall(false)
            }



        }

        if(session && !loadingSession) initCall();

        // CLEANUP METHOD  - IIFE 
        return () => {
            ( async () => {
                try{
                    if(videoCall) await videoCall.leave();
                    if(chatClientInstance) await chatClientInstance.disconnectUser()
                    await disconnectStreamClient()
                }
                catch(e){
                    console.error("Eroor While Cleanup" , e);
                    
                }
            }) ();

        }


    },[session , loadingSession , isHost , isParticipant])



  return {
    streamClient,
    call ,
    chatClient,
    channel,
    initializingCall
  }
   
  
}

export default useStreamClient
