import express from "express";
import ViteExpress from "vite-express";
import users, { posts } from "./data.js";

let postMem = structuredClone(posts)

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

function createUser(req, res, next) {
  const { username, password } = req.body;
  const { found } = checkUsername(username);

  if (found) return res.status(409).json({ success: false });

  users.push({ username: username, password: password });
  console.log(users);
  res.status(201).json({ success: true });
}

function authenticate(req, res, next) {
  const { username, password } = req.body;
  // console.log(username, password);
  let { found, pass } = checkUsername(username);
  if (found && password === pass)
    return res.status(200).json({ username: username, success: true });
  res.status(403).json({ success: false });
}

function checkUsername(name) {
  let found = false;
  let password = "";
  users.forEach((user) => {
    if (user.username === name) {
      password = user.password;
      found = true;
    }
  });
  return { found: found, pass: password };
}

app.post("/api/login", authenticate);

app.post("/api/register", createUser);

app.get("/api/posts", (req, res) => {
  res.json(postMem);
});

app.get("/api/post/:postId", getPost);

function getPost(req, res, next) {
  const { postId } = req.params;
  // console.log(typeof postId);
  const post = postMem.filter((post) => post.id === Number(postId));
  // console.log(post)
  if (post) return res.status(200).json({ post: post });
  return res.status(404).json({ post: null });
}

app.put("/api/edit/:postId", editPost);

function editPost(req, res, next) {
  let { postId } = req.params;
  const { title, text, image } = req.body;
  // console.log(title);
  postId = Number(postId)

  const post = postMem.filter((post) => post.id === postId);

  if (post) {
    postMem = postMem.map((item) => {
      if (item.id === postId) {
        return {
          id: item.id,
          title: title,
          image: image,
          text: text,
          createdBy: item.createdBy,
          desc: item.desc,
          createdAt: new Date(),
        };
      }
      return item
    })
    return res.status(200).json({ success: true });
  }
  return res.status(404).json({ success: false });
}

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
