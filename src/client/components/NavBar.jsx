import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <div className="fixed bg-white shadow-md z-50 w-full px-5 flex justify-between items-center">
      <ul className="flex mx-auto">
        <li>
          <Link to="/"><div className="nav">Home</div></Link>
        </li>
        <li>
          <Link to="/myPosts"><div className="nav">Your posts</div></Link>
        </li>
        <li>
          <Link to="/profile"><div className="nav">Profile</div></Link>
        </li>
        <li className="text-gray-500 h-full p-6 ml-10">{currentUser.email}</li>
      </ul>
    </div>
  );
};

export default NavBar;
