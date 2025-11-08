import { Post } from "../models/postSchema.js";

//Create post
const createPost = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Not authorized. Please log in." });
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Post content cannot be empty." });
    }

    const newPost = await Post.create({
      user: req.user._id,  
      text: text.trim(),
      imageUrl: imageUrl || null,
    });

    const postWithUser = await newPost.populate("user", "name email avatarUrl");
    // console.log(postWithUser)

    //populate iis populating the user data (emial name avtarUrl)
    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post: postWithUser,
    });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: "Server error while creating post." });
  }
};

//Feed -->Get all post
const getPostsFeed = async (req, res) => {
  try {
    // Fetch all posts and populate user info
    const posts = await Post.find({})
      .populate("user", "name email avatarUrl") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      totalPosts: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
};


export default {
    createPost,
    getPostsFeed
}