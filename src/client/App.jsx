import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import ErrorPage from "./routes/errorPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoutes from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<Root />}
            exact
          />
        </Route>
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
      </Routes>
    </AuthProvider>
  );
};

export default App;
