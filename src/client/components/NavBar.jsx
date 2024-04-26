import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="fixed bg-white shadow-md z-50 w-full px-5 flex justify-between items-center">
      <ul className="flex mx-auto">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "text-gray-400" : undefined}
          >
            <div className="nav">Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myPosts"
            className={({ isActive }) => isActive ? "text-gray-400" : undefined}
          >
            <div className="nav">Your posts</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? "text-gray-400" : undefined}
          >
            <div className="nav">Profile</div>
          </NavLink>
        </li>
        <li className="text-gray-500 h-full p-6 ml-10">{currentUser.email}</li>
      </ul>
    </nav>
  );
};

export default NavBar;
