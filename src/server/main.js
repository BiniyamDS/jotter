import express from "express";
import ViteExpress from "vite-express";
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
const app = express();
app.use(express.json());

//// api endpoints
app.get("/api/posts", validateToken, async (req, res) => {
  const { rows } = await pool.query("select * from posts");
  res.json(rows);
});
app.get("/api/post/:postId", validateToken, getPost);
app.put("/api/post/:postId", validateToken, validateUser, editPost);
app.post("/api/post/", validateToken, createPost);
app.delete("/api/post/:postId", validateToken, validateUser, deletePost);

// Middle ware functions
/// validate firebase jwt tokens
async function validateToken(req, res, next) {
  let idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }
  idToken = idToken.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken.uid; // Attach decoded token to request object
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).send("Unauthorized");
  }
}

/// validate the level of access of the user
async function validateUser(req, res, next) {
  if (req.user === process.env.VITE_ADMIN_TOKEN) {
    next();
  } else {
    const { postId } = req.params;

    const { rows } = await pool.query(
      `select uuid from posts where post_id=${postId}`
    );
    if (rows[0].uuid === req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
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
async function deletePost(req, res, next) {
  let { postId } = req.params;
  postId = Number(postId);

  try {
    await pool.query(`delete from posts where post_id=${postId}`);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
}

async function createPost(req, res, next) {
  const { title, text, image, desc, user } = req.body;
  try {
    const query_text = `insert into posts
    (title, image_url, content, content_desc, user_id, uuid)
    values ($1, $2, $3, $4, $5, $6)
    returning post_id
    `;

    const values = [title, image, text, desc, user, req.user];
    const { rows } = await pool.query(query_text, values);
    return res.status(201).json({ success: true, id: rows[0].post_id });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(404).json({ success: false });
  }
}

async function editPost(req, res, next) {
  let { postId } = req.params;
  const { title, text, image, desc } = req.body;
  postId = Number(postId);

  try {
    const query_text = `update posts set title=$1, content=$2, image_url=$3, content_desc=$4 where post_id=$5`;
    const response = await pool.query(query_text, [
      title,
      text,
      image,
      desc,
      postId,
    ]);
    return res.status(200).json({ success: true, id: postId });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false });
  }
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
