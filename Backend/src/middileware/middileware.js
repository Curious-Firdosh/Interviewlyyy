
import { requireAuth } from "@clerk/express";
 import User from "../model/User.js";


export const protectRoute = [
  requireAuth(),

  async (req, res, next) => {
    console.log("STEP 1: entered protectRoute");

    try {
      const clerkId = req.auth?.userId;
      console.log("STEP 2: clerkId =", clerkId);

      const user = await User.findOne({ clerkId });
      console.log("STEP 3: user =", user);

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
