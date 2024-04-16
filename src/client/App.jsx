import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import ErrorPage from "./routes/errorPage";
import Content from "./routes/content";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Root />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
        <Route
          path="/content"
          element={<Content />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
