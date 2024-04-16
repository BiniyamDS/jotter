import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const { register } = useAuth();

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!nameRef.current.value || !passwordRef.current.value) {
      return setError("Please input username and password");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    const { success } = await register(
      nameRef.current.value,
      passwordRef.current.value
    );
    if (success) {
      navigate("/login");
    } else {
      setError("Username already exists!");
    }
  }

  return (
    <Card>
      <div className="flex flex-col">
        <h1 className="text-4xl m-2 mx-auto">Register</h1>
        {error && <span className="error">{error}</span>}
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
          <label htmlFor="confirm-pass">Confirm password</label>
          <input
            type="password"
            name="confirm-pass"
            id="consfirm-pass"
            className="input"
            ref={passwordConfirmRef}
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
    </Card>
  );
};

export default Register;
