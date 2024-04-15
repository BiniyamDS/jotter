import express from "express";
import ViteExpress from "vite-express";
import users from "./data.js";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

function createUser(req, res, next) {
  const { username, password } = req.body;
  let exists = false;

  users.forEach((user) => {
    if (user.username === username) {
      console.log("found it");
      res.sendStatus(409);
      exists = true;
    }
  });

  if (!exists) {
    users.push({ username: username, password: password });
    console.log(users);
    res.sendStatus(201);
  }
}

function authenticate(req, res, next) {
  const { username, password } = req.body;
  console.log(username, password)
  let found = false

  users.forEach((user) => {
    if (user.username === username) {
      if (user.password === password) {
        res.sendStatus(200)
        found = true
      }
    }
  });
  if (!found) res.sendStatus(403);
}

app.post("/api/login", authenticate);

app.post("/api/register", createUser);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
