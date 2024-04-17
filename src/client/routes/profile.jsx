import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>Profile page for {currentUser && currentUser.username}!{" "}
      <button className="btn" onClick={handleLogout}>
        Log out!
      </button>
    </div>
  )
}

export default Profile