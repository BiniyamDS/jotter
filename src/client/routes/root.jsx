// import { Link, Outlet } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-24 relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
