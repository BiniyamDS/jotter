import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Login from "./routes/login";
import Register from "./routes/register";
import ErrorPage from "./routes/errorPage";
import Content from "./routes/content";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Root />}
      >
        <Route
          index
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Route>
      <Route path="/content" element={<Content/>}/>
    </Routes>
  );
};

export default App;
