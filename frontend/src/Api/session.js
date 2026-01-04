
import axiosinstance from "../lib/axios.js";

export const sessionApi = {
    createSession :  async (data) => {
        const resposne = await axiosinstance.post("/sessions", data);
        return resposne.data
    },

    getActiveSession :  async () => {
        const response = await axiosinstance.get("/sessions/active");
        console.log("That active Session Api Run" , response.data);
        
        return response.data
       
    },

    getRecentSession :  async () => {
        const resposne = await axiosinstance.get("/sessions/my-recent-sessions");
        return resposne.data
    },

    getSessionbyId :  async (id) => {
        const resposne = await axiosinstance.get(`/sessions/${id}`);
        return resposne.data
    },

    joinSessionWithId :  async (id) => {
        const resposne = await axiosinstance.post(`/sessions/${id}/join`);
        return resposne.data
    },

    endSessionById : async (id) => {
        const resposne = await axiosinstance.post(`/sessions/${id}/end`);
        return resposne.data
    },

    getstreamToken : async () => {
        const resposne = await axiosinstance.get(`/chat/token`);
        return resposne.data
    },


}

