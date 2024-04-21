import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <div className="flex">
      <ul className="flex mx-auto">
        <li className="nav">
          <Link to="/">Home</Link>
        </li>
        <li className="nav">
          <Link to="/myPosts">Your Posts</Link>
        </li>
        <li className="nav">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="text-gray-500 h-full p-6 ml-10">{currentUser.email}</li>
      </ul>
    </div>
  );
};

export default NavBar;
