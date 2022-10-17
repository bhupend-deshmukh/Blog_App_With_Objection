require("dotenv").config();
const express = require("express");
const app = express();
const userrouter = require("./Routes/users.routes");
const postrouter = require("./Routes/posts.routes")
const likesrouter = require("./Routes/likes.routes")

app.use(express.json())
app.use(userrouter)
app.use(postrouter)
app.use(likesrouter)

let PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log(`Your server is listening on http://localhost:${PORT}`);
});