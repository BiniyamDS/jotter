// import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Root = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function handleLogout(){
    logout()
    navigate('/login')
  }
  return (
    <div>
      Root page for {currentUser && currentUser.username}! <button className="btn" onClick={handleLogout}>Log out!</button>
    </div>
  );
};

export default Root;
