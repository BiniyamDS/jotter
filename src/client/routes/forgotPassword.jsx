import { useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!emailRef.current.value) {
      return setError("Please enter an email");
    }

    try {
      setMessage('')
        setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for more instructions')
    //   navigate("/");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Card>
      <div className="flex flex-col">
        <h1 className="text-3xl m-2 mx-auto">Password Reset</h1>
        {error && <span className="error">{error}</span>}
        {message && <span className="error !bg-green-400">{message}</span>}
        {/* {currentUser.email} */}
        <form className="p-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
            ref={emailRef}
          />
          <button type="submit" className="btn w-full" onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
        <div className="mx-auto">
          <Link className="text-blue-700 hover:underline" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Login;
