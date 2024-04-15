import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import ErrorPage from "./routes/errorPage";
import Auth from "./routes/auth";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Root />}
      />
      <Route
        path="/auth"
        element={<Auth />}
      >
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
      </Route>
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
};

export default App;
