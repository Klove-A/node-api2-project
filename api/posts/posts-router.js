const express = require("express")
const Post = require("./posts-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  };
});

module.exports = router;
