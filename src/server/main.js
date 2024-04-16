import express from "express";
import ViteExpress from "vite-express";
import users from "./data.js";

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

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
