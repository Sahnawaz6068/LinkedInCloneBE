import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function setTokenCookie(res, token) {

  res.cookie("token", token, {
    httpOnly: true, 
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}


async function register(req, res) {
  try {
    const { name, email, password, avatarUrl = null } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      avatarUrl,
    });

    const userObj = user.toObject();
    delete userObj.password;

    const token = createToken(user._id);
    setTokenCookie(res,token);

    return res.status(201).json({ user: userObj, token });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const userObj = user.toObject();
    delete userObj.password;

    const token = createToken(user._id);
    setTokenCookie(res,token);

    return res.status(200).json({ user: userObj, token });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

//getUserProfile

// controllers/userController.js
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Not authenticated." });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Get My Profile Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export default {
  register,
  login,
  getUserProfile
};
 