import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setUnauthorized(false);
    setSubmitted(true);
    if (!name || !password) return;
    console.log("submitted");
    try {
      const { data } = await axios.post("/api/login", {
        username: name,
        password: password,
      });
      setUnauthorized(false)
      navigate("/content");
    } catch (err) {
      console.log(`Error: ${err}`);
      setSubmitted(false);
      setUnauthorized(true);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl m-2 mx-auto">Login</h1>
      {isSubmitted && (!name || !password) && (
        <span className="error">Please enter username and password</span>
      )}
      {unauthorized && (
        <span className="error">Incorrect username and password</span>
      )}
      <form className="p-2 flex flex-col">
        <label
          htmlFor="username"
          // className="p-2"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </form>
      <div className="mx-auto">
        <p>
          Don't have an account?{" "}
          <Link
            className="text-blue-700 hover:underline"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
