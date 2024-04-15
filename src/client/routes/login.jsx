const Login = () => {
  return (
    <div>
      <form className="p-2 flex flex-col items-start">
        <label htmlFor="username" className="p-2">
          Username:{" "}
          <input
            type="text"
            name="username"
            id="username"
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            type="text"
            name="password"
            id="password"
          />
        </label>
        <button type="submit" className="btn">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
