import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 
 *   // 1. Get token from cookies
        // 2. Verify token
            // 3. Find user in DB
               // 4. Attach user to request for downstream use
                  // 5. Continue to next middleware or controller
 */
const authorize = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found or no longer exists." });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res
      .status(500)
      .json({ error: "Server error during authorization." });
  }
};

export default {
    authorize
}