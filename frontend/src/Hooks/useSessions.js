import {useQuery ,useMutation} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../Api/session"


export const useCreateSession = () => {
    
    const result = useMutation ({
        mutationKey : ["createSession"],
        mutationFn : sessionApi.createSession,
        onSuccess : () => toast.success("Session Created SuccessFully"),
        onError  : (error) => toast.error(error?.response?.data?.message || error.message)
    });

    return result
};


export const useActiveSessions = () => {
    
    const result = useQuery({
        queryKey : ["activeSessions"],
        queryFn : sessionApi.getActiveSession
    });

    return result;
    
};


export const useMyRecentSessions = () => {
    
    const result = useQuery({
        queryKey : ["recentSessions"],
        queryFn : sessionApi.getRecentSession
    });

    return result;
    
}


export const useSessionById = (id) => {
      
    const result = useQuery({
        queryKey : ["session" , id],
        queryFn : sessionApi.getSessionbyId(id),
        enabled : !!id,
        refetchInterval : 5000
    });

    return result;
};




export const useJoinSession = (id) => {
    
    const result = useMutation ({
        mutationKey : ["joinSession" , id],
        mutationFn : sessionApi.joinSessionWithId(id),
        onSuccess : () => toast.success("Session Joined SuccessFully"),
        onError  : (error) => toast.error(error?.response?.data?.message || "Failed To Join Room")
    });

    return result;
};


export const useEndSession = (id) => {
    
    const result = useMutation ({
        mutationKey : ["EndSession" , id],
        mutationFn : sessionApi.endSessionById(id),
        onSuccess : () => toast.success("Session End SuccessFully"),
        onError  : (error) => toast.error(error?.response?.data?.message || "Failed To End Room")
    });

    return result;
}