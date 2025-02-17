const express = require("express")
const Post = require("./posts-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  };
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      res.status(200).json(post);
    };
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved"
    });
  };
});

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post"
      });
    } else {
      const newPost = await Post.insert({ title, contents });
      console.log(newPost);
      res.status(201).json({
        id: newPost,
        title,
        contents
      });
    };
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    });
  };
});

router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;
    const { id } = req.params;
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post"
      });
    } else {
      const updatedPost = await Post.update(id, { title, contents });
      if (!updatedPost) {
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        })
      } else {
        res.json({
          id: updatedPost,
          title,
          contents
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified"
    });
  };
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      await Post.remove(id);
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed"
    });
  };
});

router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      const comments = await Post.findPostComments(id);
      res.json(comments);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved"
    });
  };
});

module.exports = router;
