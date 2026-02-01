import express from "express"
import { protectRoute } from "../middileware/middileware.js"
import { createSession, endSession, getActiveSessions, getRecentSessions, getSessionbyId, joinSession } from "../controller/sessionController.js";


const router = express.Router();

// api/session
router.post('/' , protectRoute , createSession);
router.get('/active' , protectRoute ,getActiveSessions);
router.get('/my-recent-sessions' , protectRoute ,getRecentSessions);

router.get("/:id" , protectRoute , getSessionbyId);
router.post("/:id/join" , protectRoute ,joinSession)
router.post("/:id/end" , protectRoute , endSession);


export default router