import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex">
      <ul className="flex mx-auto">
        <li className="nav">
          <Link to="/">Home</Link>
        </li>
        <li className="nav">
          <Link to="/myPosts">Your posts</Link>
        </li>
        <li className="nav">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
