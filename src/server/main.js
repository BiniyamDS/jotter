import express from "express";
import ViteExpress from "vite-express";
import users, { posts } from "./data.js";
import { config } from "dotenv";
import admin from "firebase-admin";
import pkg from "pg";
config();
import firebase_service_account from "../../firebase_service_account.json" assert { type: "json" };

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(firebase_service_account),
});

/// initialize and connect to psql
const { Pool } = pkg;
const credentials = {
  user: process.env.VITE_DB_USER,
  host: process.env.VITE_,
  database: process.env.VITE_DB,
  password: process.env.VITE_DB_PASSWORD,
  port: 5432,
};

const pool = new Pool(credentials);

// temporary posts object
let postMem = structuredClone(posts);
const app = express();
app.use(express.json());

//// api endpoints
app.get("/api/posts", validateToken, async (req, res) => {
  const { rows } = await pool.query("select * from posts");
  // console.log(result.rows)
  res.json(rows);
});
app.get("/api/post/:postId", validateToken, getPost);
app.put("/api/post/:postId", validateToken, editPost);
app.post("/api/post/", validateToken, createPost);
app.delete("/api/post/:postId", validateToken, deletePost);

// Middle ware functions

async function validateToken(req, res, next) {
  let idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }
  idToken = idToken.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token to request object
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).send("Unauthorized");
  }
}

async function getPost(req, res, next) {
  const { postId } = req.params;
  const { rows } = await pool.query(
    `select * from posts where post_id=${Number(postId)}`
  );
  if (rows) return res.status(200).json({ post: rows });
  return res.status(404).json({ post: null });
}
function deletePost(req, res, next) {
  let { postId } = req.params;
  postId = Number(postId);

  try {
    postMem = postMem.filter((post) => post.id !== postId);
    return res.sendStatus(204);
  } catch {
    return res.sendStatus(404);
  }
}

async function createPost(req, res, next) {
  const { title, text, image, desc, user } = req.body;
  console.log("in create");
  try {
    const query_text = `insert into posts
    (title, image_url, content, content_desc, user_id)
    values ($1, $2, $3, $4, $5)
    returning post_id
    `;

    const values = [title, image, text, desc, user];
    const { rows } = await pool.query(query_text, values);
    console.log(rows);
    return res.status(201).json({ success: true, id: rows[0].post_id });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(404).json({ success: false });
  }
}

function editPost(req, res, next) {
  let { postId } = req.params;
  const { title, text, image, desc } = req.body;
  postId = Number(postId);

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
          desc: desc,
          createdAt: new Date(),
        };
      }
      return item;
    });
    return res.status(200).json({ success: true, id: postId });
  }
  return res.status(404).json({ success: false });
}

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

////  -------------- old custom auth server -------------------------

// app.use(express.urlencoded({ extended: true }));

// function createUser(req, res, next) {
//   const { username, password } = req.body;
//   const { found } = checkUsername(username);

//   if (found) return res.status(409).json({ success: false });

//   users.push({ username: username, password: password });
//   console.log(users);
//   res.status(201).json({ success: true });
// }

// function authenticate(req, res, next) {
//   const { username, password } = req.body;
//   let { found, pass } = checkUsername(username);
//   if (found && password === pass)
//     return res.status(200).json({ username: username, success: true });
//   res.status(403).json({ success: false });
// }

// function checkUsername(name) {
//   let found = false;
//   let password = "";
//   users.forEach((user) => {
//     if (user.username === name) {
//       password = user.password;
//       found = true;
//     }
//   });
//   return { found: found, pass: password };
// }
