import axios from "axios";

export async function createUser(username, password) {
  try {
    const { data } = await axios.post("/api/register", {
      username: username,
      password: password,
    });
    return {username: data.username}
  } catch (err) {
    throw err;
  }
  return;
}
export async function login(username, password) {
  try {
    const { data } = await axios.post("/api/login", {
      username: username,
      password: password,
    });
    return {username: data.username}
  } catch (err) {
    throw err;
  }
}
