import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import ErrorPage from "./routes/errorPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoutes from "./components/PrivateRoute";
import Home from "./routes/home";
import YourPosts from "./routes/myPosts";
import Profile from "./routes/profile";
import Post from "./routes/post";
import EditBlog from "./routes/editBlog";
import CreateBlog from "./routes/createBlog";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<Root />}
            exact
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="myPosts"
              element={<YourPosts />}
            />
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="create"
              element={<CreateBlog />}
            />
            <Route
              path="post/:postId"
              element={<Post />}
            />
            <Route
              path="edit/:postId"
              element={<EditBlog />}
            />
          </Route>
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
