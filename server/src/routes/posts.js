import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.create({
      user: req.user._id,
      text,
      authorName: req.user.name,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "name bio"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name bio")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "name bio")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
