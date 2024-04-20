import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const { signIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!nameRef.current.value || !passwordRef.current.value) {
      return setError("Please input username and password");
    }

    try {
      await signIn(nameRef.current.value, passwordRef.current.value);
      setLoading(true);
      navigate("/");
    } catch {
      setError("Incorrect username or password");
    }

    setLoading(false);
  }

  return (
    <Card>
      <div className="flex flex-col">
        <h1 className="text-4xl m-2 mx-auto">Login</h1>
        {error && <span className="error">{error}</span>}
        {/* {currentUser.email} */}
        <form className="p-2 flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            ref={nameRef}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
            ref={passwordRef}
          />
          <button type="submit" className="btn w-full" onClick={handleSubmit}>
            Log in
          </button>
        </form>
        <div className="mx-auto">
          <Link className="text-blue-700 hover:underline" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="mx-auto">
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-700 hover:underline" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default Login;
