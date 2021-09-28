// implement your server here
const express = require("express");

const server = express();
// require your posts router and connect it here
const postsRouter = require("./posts/posts-router")

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>inside server.js</h>
  `);
});

module.exports = server;