import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Your posts</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
