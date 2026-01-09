
import { requireAuth } from "@clerk/express";
 import User from "../model/User.js";


export const protectRoute = [
  requireAuth(),

  async (req, res, next) => {
  

    try {
      const clerkId = req.auth?.userId;
   

      const user = await User.findOne({ clerkId });


      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      req.user = user;
      next();
    } catch (e) {
      console.error("PROTECT ERROR:", e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
