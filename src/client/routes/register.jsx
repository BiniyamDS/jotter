import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [exists, setExists] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setExists(false)
    setSubmitted(true);
    if (!name || !password) return;
    console.log("submitted");
    try {
      const { data } = await axios.post("/api/register", {
        username: name,
        password: password,
      });
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err}`);
      setSubmitted(false);
      setExists(true);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl m-2 mx-auto">Register</h1>
      {isSubmitted && (!name || !password) && (
        <span className="error">Please enter username and password</span>
      )}
      {exists && (
        <span className="error">Username already exists!</span>
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
        <label htmlFor="confirm-pass">Confirm password</label>
        <input
          type="password"
          name="confirm-pass"
          id="consfirm-pass"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </form>
      <div className="mx-auto">
        <p>
          Already have an account?{" "}
          <Link
            className="text-blue-700 hover:underline"
            to="/"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
